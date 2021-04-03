import logo from "./logo.svg";
import "./App.css";
import { firestore } from "./firebase";
import React, { useEffect } from "react";

function App() {
  useEffect(() => {
    async function executeOnMount() {
      // You can await here
      const posts = await firestore
        .collection("posts")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();

            console.log({ id, data });
          });
          console.log({ snapshot });
        });
    }

    executeOnMount();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
