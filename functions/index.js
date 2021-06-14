const functions = require("firebase-functions");
const admin = require("firebase-admin");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

// Big Idea: run firebase deploy --only functions on terminal,
// get these cool https urls where you have https endpoints

// firebase serve --only functions
// these commands will run on localhost:5000

admin.initializeApp(functions.config().firebase);

const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// https://us-central1-think-piece-dad44.cloudfunctions.net/helloWorld
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// https://us-central1-think-piece-dad44.cloudfunctions.net/getAllPosts
exports.getAllPosts = functions.https.onRequest(async (request, response) => {
  const snapshot = await firestore.collection("posts").get();
  const posts = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  response.json({ posts });
});

// wow...so anytime a post has the word coffeescript in it,
// it'll replace it with **** with Cloud Functions
// wrote some weird code 'cause triggering change is sort of
// recursion-y...
exports.sanitizeContent = functions.firestore
  .document("posts/{postId}")
  .onWrite(async (change) => {
    if (!change.after.exists) return;

    const { content, sanitized } = change.after.data();

    if (content && !sanitized) {
      return change.after.ref.update({
        content: content.replace(/CoffeeScript/g, "******"),
        sanitized: true,
      });
    }

    return null;
  });

// the comment count will go up next to the monkey emoji.
// cloud functions are so cool!!
exports.incrementCommentCount = functions.firestore
  .document("posts/{postId}/comments/{commentId}")
  .onCreate(async (snapshot, context) => {
    const { postId } = context.params;
    const postRef = firestore.doc(`posts/${postId}`);

    const snap = await postRef.get("comments");
    const comments = snap.get("comments");
    return postRef.update({ comments: comments + 1 });
  });
