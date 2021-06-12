import React, { Component } from "react";

import Post from "./Post";
import Comments from "./Comments";

import { firestore } from "../firebase";

import { collectIdsAndDocs } from "../utilities";
import { withRouter } from "react-router-dom";

class PostPage extends Component {
  state = { posts: null, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromPost = null;
  unsubscribeFromComments = null;

  componentDidMount = async () => {
    // pretend millions of people are using it; anytime there're updates to posts and comments this page will auto-update
    this.unsubscribeFromPost = this.postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndDocs(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComments = this.commentsRef.onSnapshot((snapshot) => {
      const comments = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromPost();
    this.unsubscribeFromComments();
  };

  render() {
    const { post, comments } = this.state;
    return (
      <section>
        {post && <Post {...post} />}
        <Comments comments={comments} onCreate={() => {}} />
      </section>
    );
  }
}

export default withRouter(PostPage);
