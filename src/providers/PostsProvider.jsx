import React, { useState, useEffect, createContext } from "react";
import { firestore } from "../firebase";
import { collectIdsAndDocs } from "../utilities";

export const PostsContext = createContext();

// class PostsProvider extends Component {
//   state = { posts: [] };

//   componentDidMount = () => {
//       this.unsubscribeFromFirestore =
//   };

//   render() {
//     const { posts } = this.state;
//     const { children } = this.props;

//     return (
//       <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
//     );
//   }
// }

const PostsProvider = ({ children }) => {
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
      // const snapshot = await firestore.collection("posts").get();

      // const posts = snapshot.docs.map(collectIdsAndDocs);

      // setPosts(posts);

      // onSnapshot: an alternative to get()
      // feels more like ActionCable
      // basically putting in a listener...
      // any time the snapshot changes, update the UI
      // executing unsubscribe() makes it equivalent to unmounting

      // PROS: other browsers automatically get new posts populating the UI
      // PROS: no need to do any async await update UI action on handleCreate I would think
      // PROS: no need to prop drill functions to bubble up state to the App

      // CONS: some more listener cleanup which seems very confusing if you don't know Firebase
      const unsubscribeFromFirestore = firestore
        .collection("posts")
        .onSnapshot((snapshot) => {
          const posts = snapshot.docs.map(collectIdsAndDocs);
          setPosts(posts);
        });

      return () => {
        // cleanup functions... weird syntax to remove  listeners but oh well.
        unsubscribeFromFirestore();
      };
    }

    executeOnMount();
  }, []);

  return (
    <PostsContext.Provider value={posts}>{children}</PostsContext.Provider>
  );
};

export default PostsProvider;
