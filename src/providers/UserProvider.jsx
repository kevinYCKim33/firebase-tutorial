import React, { useState, useEffect, createContext } from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function executeOnMount() {
      // You can await here
      // const snapshot = await firestore
      //   .collection("posts")
      //   .get()
      //   .then((snapshot) => {
      //     snapshot.forEach((doc) => {
      //       const id = doc.id;
      //       const data = doc.data();

      //       console.log({ id, data });
      //     });
      //     console.log({ snapshot });
      //   });

      //
      // snapshot.docs.map();

      // https://console.firebase.google.com/u/1/project/think-piece-dad44/authentication/providers
      // const snapshot = await firestore.collection("posts").get();

      // const posts = snapshot.docs.map(collectIdsAndDocs);

      // setPosts(posts);

      // onSnapshot: an alternative to get()
      // feels more like ActionCable
      // basically putting in a listener...
      // any time the snapshot changes, update the UI
      // executing unsubscribe() makes it equivalent to unmounting

      // PROS: other browsers automatically get new posts populating the UI
      // PROS: no need to do any async await update UI action on handleCreate I would think
      // PROS: no need to prop drill functions to bubble up state to the App

      // CONS: some more listener cleanup which seems very confusing if you don't know Firebase
      // const unsubscribeFromFirestore = firestore
      //   .collection("posts")
      //   .onSnapshot((snapshot) => {
      //     console.log("does snapshot hit?");
      //     const posts = snapshot.docs.map(collectIdsAndDocs);
      //     setPosts(posts);
      //   });

      // returns just now logged in user or null for a user if just logged out
      // buggy API, I'm at peace with it
      // https://stackoverflow.com/questions/37673616/firebase-android-onauthstatechanged-called-twice
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        // console.log("does this work at least?");
        // Place 2 of 2 of createUserProfileDocument() being called
        // User signs in/up with Google OAuth

        if (userAuth) {
          // if you're logged in; remember userAuth == null when logged out

          // get the user document from firestore!
          const userRef = await createUserProfileDocument(userAuth);

          // now anytime that changes; i.e. his displayname for example
          userRef.onSnapshot((snapshot) => {
            // just update the user profile in the UI

            // no refetching; firestore listeners do all the work for you!
            setUser({ uid: snapshot.id, ...snapshot.data() });
          });
        }
      });

      return () => {
        unsubscribeFromAuth();
      };
    }
    executeOnMount();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
