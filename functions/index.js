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
