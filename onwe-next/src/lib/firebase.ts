import firebase from "firebase/app";
import "firebase/messaging";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

export const vapidKey =
  "BHDZfhtXeXp5Q3wGWDX3krfrjRA0Ioj6La0BiGgvxE2laJR9PllfIBKk_r-7qxfUyRkLts50byHyKRP-mWAJlkM";
const firebaseConfig = {
  apiKey: "AIzaSyCFZAp483J75Lhvdms14VbjfCvF0dBaPeE",
  authDomain: "onwenotifications.firebaseapp.com",
  projectId: "onwenotifications",
  storageBucket: "onwenotifications.appspot.com",
  messagingSenderId: "34912950362",
  appId: "1:34912950362:web:6aeb8af717f3fb8d6a6063",
  measurementId: "G-MRGYCXXJ90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);
export const messaging = getMessaging();

// getToken(messaging, { vapidKey: vapidKey })
//   .then((currentToken) => {
//     if (currentToken) {
//       // Send the token to your server and update the UI if necessary
//       // ...
//     } else {
//       // Show permission request UI
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//       // ...
//     }
//   })
//   .catch((err) => {
//     console.log("An error occurred while retrieving token. ", err);
//     // ...
//   });
