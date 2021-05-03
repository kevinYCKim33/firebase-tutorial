import "./App.css";
import React from "react";
import Authentication from "./Authentication";
import Posts from "./Posts";
import { Switch, Route, Link } from "react-router-dom";
import UserProfile from "./UserProfile";

function App() {
  return (
    <main className="Application">
      <Link to="/">
        <h1>Think Piece</h1>
      </Link>
      <Authentication />
      <Switch>
        <Route exact path="/" component={Posts} />
        <Route exact path="/profile" component={UserProfile} />
      </Switch>
    </main>
  );
}

export default App;
