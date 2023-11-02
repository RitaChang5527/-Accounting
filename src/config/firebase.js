import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAXziP_mWM5rCUaG5U0EvoVpgo6gYq4HZw",
  authDomain: "accounting-1037d.firebaseapp.com",
  projectId: "accounting-1037d",
  storageBucket: "accounting-1037d.appspot.com",
  messagingSenderId: "1010028276110",
  appId: "1:1010028276110:web:9aa93f56d60fdf4eb21cdf",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

