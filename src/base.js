import Rebase from "re-base"; // <-- A react pkg for mirroring our state to firebase
import firebase from "firebase"; // <-- firebase's pkg for anything we want to mirror that isn't state.

const firebaseApp = firebase.initializeApp({
  // <-- Firebase app
  apiKey: "AIzaSyCztz5ig0uj9Hw7lL7JKIp48mLjSH5-kFY",
  authDomain: "catch-of-the-day-joel-james.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-joel-james.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database()); // Rebase bindings

// This is a named export
export { firebaseApp };

// This is the default export
export default base;
