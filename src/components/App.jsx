import "./App.css";
import { firestore } from "../firebase";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

function App() {
  const [posts, setPosts] = useState([]);

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
      const unsubscribe = firestore
        .collection("posts")
        .onSnapshot((snapshot) => {
          console.log("does snapshot hit?");
          const posts = snapshot.docs.map(collectIdsAndDocs);
          setPosts(posts);
        });

      return () => {
        unsubscribe();
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
      <Posts posts={posts} />
    </main>
  );
}

export default App;
