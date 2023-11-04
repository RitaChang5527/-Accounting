import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBQMpOUfTUrE2_6ZIV0gGeeubvo4elNt6U",
    authDomain: "accounting-6ea9a.firebaseapp.com",
    projectId: "accounting-6ea9a",
    storageBucket: "accounting-6ea9a.appspot.com",
    messagingSenderId: "359150385098",
    appId: "1:359150385098:web:92f7308e89419bbdb74133",
    measurementId: "G-XQZX3PD3JM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);