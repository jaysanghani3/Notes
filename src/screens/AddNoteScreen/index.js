import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import NetInfo from '@react-native-community/netinfo';
import Loader from '../../components/Loader';
import globalStyles from '../../utils/globalStyles';
import Strings from '../../translation/Strings';
import {
  addNotes,
  updateNote,
  updateNoteOffline,
  addNoteOffline,
} from '../../services/firestore';

const AddNoteScreen = ({route, navigation}) => {
  const {noteTitle, noteDetails, noteId, screen} = route.params;
  const [title, setTitle] = useState(noteTitle);
  const [details, setDetails] = useState(noteDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [btnText, setBtnText] = useState(Strings.addBtn);
  const [titleLength, setTitleLength] = useState(title.length);
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (screen === Strings.addScreenTitle) {
      navigation.setOptions({title: Strings.addScreenTitle});
      setBtnText(Strings.addBtn);
    } else if (screen === Strings.editScreenTitle) {
      navigation.setOptions({title: Strings.editScreenTitle});
      setBtnText(Strings.updateBtn);
    } else if (screen === Strings.viewScreenTitle) {
      navigation.setOptions({title: Strings.viewScreenTitle});
    }
  }, [navigation]);

  const handleOfflineSupport = async () => {
    try {
      navigation.goBack();
      if (screen === Strings.editScreenTitle) {
        updateNoteOffline(noteId, title, details);
      } else if (screen === Strings.addScreenTitle) {
        addNoteOffline(title, details);
      }
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSave = async () => {
    Keyboard.dismiss();
    if (!title && !details) {
      setTitleError(Strings.required);
    } else if (!title) {
      setTitleError(Strings.required);
    } else if (!details) {
    } else {
      try {
        if (!isConnected) {
          handleOfflineSupport();
        } else {
          const newNoteId = Math.random().toString(36).substring(7);
          if (screen === Strings.editScreenTitle) {
            updateNote(noteId, title, details);
          } else if (screen === Strings.addScreenTitle) {
            addNotes(newNoteId, title, details);
          }
          navigation.goBack();
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const handleTitleChange = title => {
    setTitle(title);
    setTitleLength(title.length);
    title.length >= Strings.titleLength
      ? setTitleError(Strings.titleLengthError)
      : setTitleError('');
  };

  const handleDetailsChange = details => {
    setDetails(details);
  };

  return (
    <>
      {screen === Strings.viewScreenTitle ? (
        <View style={styles.noteView}>
          <Text style={styles.noteViewTitle}>{noteTitle}</Text>
          <ScrollView>
            <Text style={styles.noteViewDetails}>{noteDetails}</Text>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.container}>
          <Loader state={isLoading} />

          <View>
            <TextInput
              placeholder={Strings.titlePlaceholder}
              maxLength={Strings.titleLength}
              style={styles.title}
              defaultValue={title}
              onChangeText={title => {
                handleTitleChange(title);
              }}
            />
            <View style={styles.row}>
              <Text style={globalStyles.error}>{titleError}</Text>
              <Text
                style={
                  titleLength === Strings.titleLength
                    ? styles.maxCount
                    : styles.titleCount
                }>
                {titleLength}/{Strings.titleLength}
              </Text>
            </View>
            <ScrollView>
              <TextInput
                placeholder={Strings.detailsPlaceholder}
                style={styles.detailsInput}
                multiline={true}
                numberOfLines={10}
                textAlignVertical="top"
                defaultValue={details}
                onChangeText={details => {
                  handleDetailsChange(details);
                }}
              />
            </ScrollView>
          </View>
          <View style={styles.btnGrp}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                setDetails('');
                setTitle('');
              }}>
              <Text style={styles.btnFont}>{Strings.resetBtn}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleSave}>
              <Text style={styles.btnFont}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};
export default AddNoteScreen;
