import "./App.css";
import React from "react";
import Authentication from "./Authentication";
import Posts from "./Posts";

function App() {
  return (
    <main className="Application">
      <h1>Think Piece</h1>
      <Authentication />
      <Posts />
    </main>
  );
}

export default App;
