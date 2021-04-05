import "./App.css";
import { firestore } from "../firebase";
import React, { useState, useEffect } from "react";
import Posts from "./Posts";
import { collectIdsAndDocs } from "../utilities";

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

      // https://console.firebase.google.com/u/1/project/think-piece-dad44/authentication/providers
      const snapshot = await firestore.collection("posts").get();

      const posts = snapshot.docs.map(collectIdsAndDocs);

      setPosts(posts);
    }

    executeOnMount();
  }, []);

  const handleCreate = async (post) => {
    const docRef = await firestore.collection("posts").add(post);

    const doc = await docRef.get();

    const newPost = collectIdsAndDocs(doc);

    setPosts([newPost, ...posts]);
  };

  console.log("posts: ", posts);

  const handleRemove = async (id) => {
    await firestore.doc(`posts/${id}`).delete();

    const filteredPosts = posts.filter((post) => post.id !== id);

    setPosts(filteredPosts);
  };

  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Posts posts={posts} onCreate={handleCreate} onRemove={handleRemove} />
    </main>
  );
}

export default App;
