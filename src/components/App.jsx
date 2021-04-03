import "./App.css";
import { firestore } from "../firebase";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";

function App() {
  const [posts, setPosts] = useState([]);

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

      const snapshot = await firestore.collection("posts").get();

      const posts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      setPosts(posts);
    }

    executeOnMount();
  }, []);

  const handleCreate = (post) => {
    setPosts([post, ...posts]);
  };

  console.log("posts: ", posts);

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} onCreate={handleCreate} />
    </main>
  );
}

export default App;
