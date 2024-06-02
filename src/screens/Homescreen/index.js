import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
import styles from './styles';
import {AlphabetList} from 'react-native-section-alphabet-list';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import globalStyles from '../../utils/globalStyles';
import Loader from '../../components/Loader';
import Icons from '../../assets';
import Strings from '../../translation/Strings';
import Colors from '../../utils/Colors';
import {
  userDocRef,
  noteDocRef,
  deleteNote,
  updateLike,
  updateLikeOffline,
} from '../../services/firestore';

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sections, setSections] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [notes, setNotes] = useState([]);
  const alphabetArray = Array.from({length: 26}, (_, i) =>
    String.fromCharCode(65 + i),
  );
  const [indexArray, setIndexArray] = useState(alphabetArray);
  const [sortType, setSortType] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  useEffect(() => {
    getUser();
    getAllNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    if (!isConnected) {
      localNotes();
    } else {
      handleLike();
      getAllNotes();
    }
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  useEffect(() => {
    const subscriber = navigation.addListener('focus', () => {
      getAllNotes();
      localNotes();
    });
    return () => subscriber();
  }, [navigation]);

  const localNotes = () => {
    try {
      const unsubscribe = noteDocRef().onSnapshot(async snapshot => {
        snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        getAllNotes();
      });

      return () => {
        unsubscribe();
      };
    } catch (e) {
      console.log(e);
    }
  };

  const getUser = async () => {
    try {
      setIsLoading(true);
      const userDocument = await userDocRef().get();
      setUser(userDocument?._data?.fullName);
      await AsyncStorage.setItem(
        'user',
        JSON.stringify(userDocument?._data.id),
      );

      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllNotes = async () => {
    try {
      setIsLoading(true);
      const notesDocRef = await noteDocRef()
        .orderBy('title', Strings.asc)
        .get();

      const notesArray = notesDocRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notesArray);
      if (notesArray.length > 0) {
        const data = notesArray.map(item => ({
          value: item.title,
          key: item.id,
          details: item.details,
          isLiked: item.isLiked,
        }));
        setSections(data);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleLike = async noteId => {
    try {
      if (!isConnected) {
        updateLikeOffline(noteId);
      } else {
        updateLike(noteId);
        getAllNotes();
      }
    } catch (e) {
      console.log(e);
      setIsLoading(false);
    }
  };

  const handleDelete = async id => {
    try {
      setIsLoading(true);
      deleteNote(id);
      getAllNotes();
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSearch = text => {
    try {
      setSearchValue(text);
      if (text) {
        const newFilteredNotes = sections?.filter(
          note =>
            note?.value?.toLowerCase()?.includes(text.toLowerCase()) ||
            note?.details?.toLowerCase()?.includes(text.toLowerCase()),
        );
        setSections(newFilteredNotes);
      } else {
        getAllNotes();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAddBtnPress = () => {
    try {
      navigation.navigate('AddNoteScreen', {
        screen: Strings.addScreenTitle,
        noteId: '',
        noteTitle: '',
        noteDetails: '',
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleEditNote = (id, title, details) => {
    try {
      navigation.navigate('AddNoteScreen', {
        screen: Strings.editScreenTitle,
        noteId: id,
        noteTitle: title,
        noteDetails: details,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleNotePress = (id, title, details) => {
    try {
      navigation.navigate('AddNoteScreen', {
        screen: Strings.viewScreenTitle,
        noteId: id,
        noteTitle: title,
        noteDetails: details,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await auth().signOut();
      setIsLoading(false);
      navigation.dispatch(StackActions.replace('LoginScreen'));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (sortType === Strings.asc) {
      handleAscSort();
    } else if (sortType === Strings.desc) {
      handleDescSort();
    }
  }, [sortType]);

  const handleDescSort = async () => {
    try {
      setIsLoading(true);
      const notesDocRef = await userDocRef()
        .collection('notes')
        .orderBy('title', Strings.desc)
        .get();

      setSortType(Strings.desc);
      setIsLoading(false);
      const notesArray = notesDocRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      if (notesArray.length > 0) {
        const data = notesArray.map(item => ({
          value: item.title,
          key: item.id,
          details: item.details,
          isLiked: item.isLiked,
        }));
        setSections(data);
        setIndexArray(alphabetArray.reverse());
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAscSort = async () => {
    try {
      getAllNotes();
      setIndexArray(alphabetArray);
    } catch (e) {
      console.log(e);
    }
  };

  const notesRender = item => {
    return (
      <ScrollView>
        <TouchableOpacity
          style={styles.note}
          onPress={() => handleNotePress(item.key, item.value, item.details)}>
          <TouchableOpacity
            onPress={() => handleLike(item.key)}
            style={styles.likeBtn}>
            <Image
              source={item.isLiked ? Icons.Like : Icons.Unlike}
              style={styles.iconSize}
            />
          </TouchableOpacity>
          <View style={styles.noteTitleContainer}>
            <Text style={styles.noteTitle}>{item.value}</Text>

            <Text numberOfLines={1} style={styles.noteDetails}>
              {item.details}
            </Text>
          </View>
          <View style={styles.justifyContentSpaceBtn}>
            <TouchableOpacity
              onPress={() =>
                handleEditNote(item.key, item.value, item.details)
              }>
              <Image source={Icons.Edit} style={styles.actionBtn} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.key)}>
              <Image source={Icons.Delete} style={styles.actionBtn} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  return (
    <View style={styles.flex1}>
      <View style={globalStyles.navbar}>
        <Image source={Icons.Profile} style={styles.iconSize} />
        <Text style={styles.userName}>{user}</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutBtnFnt}>{Strings.logoutBtn}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder={Strings.searchPlaceholder}
          placeholderTextColor={Colors.violet}
          style={styles.searchInput}
          defaultValue={searchValue}
          onChangeText={text => handleSearch(text)}
        />
        {sortType === Strings.desc ? (
          <TouchableOpacity onPress={handleAscSort} style={styles.sort}>
            <Image style={styles.iconSize} source={Icons.Asc} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleDescSort} style={styles.sort}>
            <Image style={styles.iconSize} source={Icons.Desc} />
          </TouchableOpacity>
        )}
      </View>
      <Loader state={isLoading} />

      {sections.length === 0 ? (
        <View style={globalStyles.flexCenter}>
          <Text>{Strings.noMatchingNote}</Text>
        </View>
      ) : notes.length > 0 ? (
        <AlphabetList
          index={indexArray}
          showsVerticalScrollIndicator={false}
          style={styles.noteStyle}
          data={sections}
          renderCustomItem={item => notesRender(item)}
          renderCustomSectionHeader={section => (
            <ScrollView>
              <Text style={styles.header}>{section.title}</Text>
            </ScrollView>
          )}
          indexContainerStyle={styles.indexContainerStyle}
          indexLetterStyle={styles.indexLetterStyle}
          indexLetterContainerStyle={styles.indexLetterContainerStyle}
        />
      ) : (
        <View style={globalStyles.flexCenter}>
          <Text style={globalStyles.textCenter}>{Strings.noNotes}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.addNoteBtn} onPress={handleAddBtnPress}>
        <Image source={Icons.Add} style={styles.iconSize} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
