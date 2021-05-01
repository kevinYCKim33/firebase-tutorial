import React, { Component } from "react";
import { auth, createUserProfileDocument } from "../firebase";
class SignUp extends Component {
  state = { displayName: "", email: "", password: "" };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password, displayName } = this.state;

    try {
      // normal firebase command
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      // AT THIS await IN TIME
      // first await, we log them in
      // which triggers auth state change: auth.onAuthStateChanged in App.jsx
      // Authentication.jsx flips from SignInAndSignUp to CurrentUser

      // At this point, this dude's got his email, and created at all addressed...

      // then we update the user's displayName... server side it gets there...
      // UI wise, we're already showing CurrentUser
      // user.updateProfile({ displayName }); // this is updating the server a tick too late

      // Place 1 of 2 of createUserProfileDocument() being called
      // User manually signs up sans Google OAuth
      // hmm so displayName is a firebase user property
      // at this point, user.displayName is null
      console.log("Im called inside handleSubmit!");
      createUserProfileDocument(user, { displayName });
    } catch (error) {
      console.error(error);
    }

    this.setState({ displayName: "", email: "", password: "" });
  };

  render() {
    const { displayName, email, password } = this.state;

    return (
      <form className="SignUp" onSubmit={this.handleSubmit}>
        <h2>Sign Up</h2>
        <input
          type="text"
          name="displayName"
          placeholder="Display Name"
          value={displayName}
          onChange={this.handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={this.handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={this.handleChange}
        />
        <input type="submit" value="Sign Up" />
      </form>
    );
  }
}

export default SignUp;
