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

  console.log("do i make it up to here?");
  // Get a reference to the place in the database where a user profile might be.

  console.log("what is the userid?", user.uid);
  const userRef = firestore.doc(`users/${user.uid}`);

  console.log("what about here?");
  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  console.log("what about after snapshot");

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

  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.collection("users").doc(uid).get();

    return {
      uid,
      ...userDocument.data(),
    };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = auth.signInWithGoogle(provider);
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
// export default firebase;
