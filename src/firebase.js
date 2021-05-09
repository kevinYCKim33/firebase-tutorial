import firebase from "@firebase/app"; // supposedely should do firebase/app but not working
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage"; // for photo uploading
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
export const storage = firebase.storage();
window.firebase = firebase; // solely for debugging purposes

// additionalData: i.e. displayName
export const createUserProfileDocument = async (user, additionalData) => {
  console.log("createUserProfileDocument() executed!");
  console.log("user: ", user);
  console.log("addtionalData: ", additionalData);
  // additionalData: {displayName: "Elaine Benes"} when manually signing in
  // handles signing out;
  if (!user) return;

  // Get a reference to the place in the database where a user profile might be.
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  console.log("what about after snapshot");

  // if snapshot doesn't exist, then we should create a user
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
  // user is either created or snapshot is retrieved here
  console.log("hello!");
  // create then get
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  try {
    // alternative syntax
    // this refactor was a bit strange for me
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const provider = new firebase.auth.GoogleAuthProvider();
// export const signInWithGoogle = auth.signInWithGoogle(provider);
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();
// export default firebase;
