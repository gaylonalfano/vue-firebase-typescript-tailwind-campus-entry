import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";
import "firebase/functions";

// NOTE Change this per FB project!
const firebaseConfig = {
  apiKey: "AIzaSyBzuxA2P6zrJ796DqoxldG82HmD8yxcuAE",
  authDomain: "campus-entry.firebaseapp.com",
  projectId: "campus-entry",
  storageBucket: "campus-entry.appspot.com",
  messagingSenderId: "240218157859",
  appId: "1:240218157859:web:e3ef92e4c3d8485fc29296",
};

// === Init Firebase App connection to backend
const fb = firebase.initializeApp(firebaseConfig);

// === Init Services
// Initialize Authentication Service
const auth = firebase.auth(); // Or, projectAuth

// Initialize Firestore Service
// NOTE It's this that allows us to interact with our Firestore
// to add documents, retrieve collections, etc.
const db = firebase.firestore(fb); // Or, projectFirestore

// Initialize Firebase Storage Service
const storage = firebase.storage();

// Initialize Functions Service
// Q: Is this a normal approach? Or do I even bother with Functions in config.js?
const functions = firebase.functions();

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export it so we can import/use Firebase into other files/components
export { fb, auth, db, storage, functions, timestamp };
