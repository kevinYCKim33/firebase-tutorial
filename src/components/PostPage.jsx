import React, { Component } from "react";

import Post from "./Post";
import Comments from "./Comments";

import { firestore } from "../firebase";

import { collectIdsAndDocs } from "../utilities";

class PostPage extends Component {
  state = { posts: null, comments: [] };

  render() {
    return <div>Post Page!</div>;
  }
}

export default PostPage;
