import auth from '@react-native-firebase/auth';
import firestore, {
  collection,
  doc,
  updateDoc,
  setDoc,
} from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const userDocRef = () => {
  return firestore().collection('users').doc(auth().currentUser.uid);
};

export const noteDocRef = () => {
  return userDocRef().collection('notes');
};

export const addNotes = async (id, title, details) => {
  await noteDocRef().doc(id).set({
    id,
    title,
    details,
    createdAt: firestore.FieldValue.serverTimestamp(),
    updatedDate: firestore.FieldValue.serverTimestamp(),
    isLiked: false,
  });
};

export const updateNote = async (id, title, details) => {
  await noteDocRef().doc(id).update({
    title,
    details,
    updatedDate: firestore.FieldValue.serverTimestamp(),
  });
};

export const deleteNote = async id => {
  await noteDocRef().doc(id).delete();
};

export const updateNoteOffline = async (noteId, title, details) => {
  try {
    const userDocId = JSON.parse(await AsyncStorage.getItem('user'));
    const noteDocRefOffline = doc(
      collection(firestore(), 'users', userDocId, 'notes'),
      noteId,
    );
    await updateDoc(noteDocRefOffline, {
      title,
      details,
      updatedDate: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.log('updateNoteOffline', error);
  }
};

export const addNoteOffline = async (title, details) => {
  try {
    const userDocId = JSON.parse(await AsyncStorage.getItem('user'));
    const notedID = Math.random().toString(36).substring(7);
    const noteDocRefOffline = doc(
      collection(firestore(), 'users', userDocId, 'notes'),
      notedID,
    );
    await setDoc(noteDocRefOffline, {
      id: notedID,
      title,
      details,
      createdAt: new Date(),
      updatedDate: new Date(),
      isLiked: false,
    });
    console.log('first');
  } catch (error) {
    console.log('addNoteOffline', error);
  }
};

export const updateLike = async noteId => {
  const noteRef = noteDocRef().doc(noteId);
  const noteDoc = await noteRef.get();

  if (noteDoc.exists) {
    const currentIsLiked = noteDoc.data().isLiked || false;
    await noteRef.update({
      isLiked: !currentIsLiked,
    });
  }
};

export const updateLikeOffline = async noteId => {
  try {
    const userDocId = JSON.parse(await AsyncStorage.getItem('user'));
    const noteDocRefOffline = doc(
      collection(firestore(), 'users', userDocId, 'notes'),
      noteId,
    );
    const noteDoc = await noteDocRefOffline.get();
    if (noteDoc.exists) {
      const currentIsLiked = noteDoc.data().isLiked || false;
      await updateDoc(noteDocRefOffline, {
        isLiked: !currentIsLiked,
      });
    }
  } catch (error) {
    console.log('updateLikeOffline', error);
  }
};
