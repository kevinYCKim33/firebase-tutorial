import "./App.css";
import { firestore } from "../firebase";
import React, { useState, useEffect } from "react";

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

  console.log("posts: ", posts);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
