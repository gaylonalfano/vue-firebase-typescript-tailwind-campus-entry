import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAHaqzJAz6E25lbtEm3ilf9FnOvKl0oK5A",
  authDomain: "balance-tracker-fd26d.firebaseapp.com",
  projectId: "balance-tracker-fd26d",
  storageBucket: "balance-tracker-fd26d.appspot.com",
  messagingSenderId: "1055286535153",
  appId: "1:1055286535153:web:a6c0c7ea45cfb6a820da50",
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

// === Timestamp
// Let's add a timestamp FieldValue to export to other files.
// NOTE We are storing a FUNCTION REFERENCE in timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// Export it so we can import/use Firebase into other files/components
export { fb, auth, db, storage, timestamp };
