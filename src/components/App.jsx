import "./App.css";
import { firestore, auth, createUserProfileDocument } from "../firebase";
import React, { useState, useEffect } from "react";
import Authentication from "./Authentication";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  // let unsubscribe = null;

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
      const unsubscribeFromFirestore = firestore
        .collection("posts")
        .onSnapshot((snapshot) => {
          console.log("does snapshot hit?");
          const posts = snapshot.docs.map(collectIdsAndDocs);
          setPosts(posts);
        });

      // returns just now logged in user or null for a user if just logged out
      const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
        // console.log("does this work at least?");
        // Place 2 of 2 of createUserProfileDocument() being called
        // User signs in/up with Google OAuth

        console.log("Im called from firebase listener!");
        const user = await createUserProfileDocument(userAuth);
        setUser(user);
      });

      return () => {
        // cleanup functions... weird syntax to remove  listeners but oh well.
        unsubscribeFromFirestore();
        unsubscribeFromAuth();
      };
    }

    executeOnMount();
  }, []);

  // const handleCreate = async (post) => {
  //   firestore.collection("posts").add(post);

  //   // const doc = await docRef.get();

  //   // const newPost = collectIdsAndDocs(doc);

  //   // setPosts([newPost, ...posts]);
  // };

  // const handleRemove = async (id) => {
  //   firestore.doc(`posts/${id}`).delete();
  // };
  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Authentication user={user} />
      <Posts posts={posts} />
    </main>
  );
}

export default App;
