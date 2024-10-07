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
const firebaseApp = initializeApp(firebaseConfig);
export default firebaseApp;
// const messaging = getMessaging(app);
