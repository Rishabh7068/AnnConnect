import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDpmfdGONGwhgRZ-OzbCFFmCvEHnHRv7kI",
    authDomain: "annaconnect-2a96b.firebaseapp.com",
    projectId: "annaconnect-2a96b",
    storageBucket: "annaconnect-2a96b.appspot.com",
    messagingSenderId: "354254415141",
    appId: "1:354254415141:web:a92fd17f89b127718c26cc",
    measurementId: "G-V93DGDMJ15"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth ,googleProvider};
