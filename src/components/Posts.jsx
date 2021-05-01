import React from "react";
import Post from "./Post";
import AddPost from "./AddPost";
import { PostsContext } from "../providers/PostsProvider";

const Posts = () => {
  return (
    <section className="Posts">
      <AddPost />
      {/* cool quirky way to go about it pre hooks era */}
      <PostsContext.Consumer>
        {(posts) => posts.map((post) => <Post {...post} key={post.id} />)}
      </PostsContext.Consumer>
    </section>
  );
};

export default Posts;
// let's see
