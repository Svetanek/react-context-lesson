import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAq-r-oB6-Sd4ngoriM3RlGLjeh7zJNSxQ',
  authDomain: 'shop-db-44779.firebaseapp.com',
  databaseURL: 'https://shop-db-44779.firebaseio.com',
  projectId: 'shop-db-44779',
  storageBucket: 'shop-db-44779.appspot.com',
  messagingSenderId: '826276724102',
  appId: '1:826276724102:web:98098056af1337868e4007',
  measurementId: 'G-WYT0FEBMLY',
};
firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
