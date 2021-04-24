import firebase from "@firebase/app"; // supposedely should do firebase/app but not working
import "@firebase/firestore";
import "@firebase/auth";
// clicked on something that said add firebase to your web app
// https://console.firebase.google.com/u/1/project/think-piece-dad44/overview
const firebaseConfig = {
  apiKey: "AIzaSyCMdj0MTZ5Risl7JniLkZHyElJkBL6dIoc",
  authDomain: "think-piece-dad44.firebaseapp.com",
  projectId: "think-piece-dad44",
  storageBucket: "think-piece-dad44.appspot.com",
  messagingSenderId: "419810770552",
  appId: "1:419810770552:web:9aea12b8d53e541867778d",
  measurementId: "G-QLT8J1YPL6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

export const firestore = firebase.firestore(); // this is all it takes to get a database
export const auth = firebase.auth();
window.firebase = firebase; // solely for debugging purposes

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error("Error creating user", error);
    }
  }
};

export const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = auth.signInWithGoogle(provider);
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
// export default firebase;
