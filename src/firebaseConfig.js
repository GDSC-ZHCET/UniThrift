import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2GSYEA4OtORACjd72M6e221iVz9BhrGY",
    authDomain: "unithrift-gsc.firebaseapp.com",
    projectId: "unithrift-gsc",
    storageBucket: "unithrift-gsc.firebasestorage.app",
    messagingSenderId: "90777940225",
    appId: "1:90777940225:web:8c219c729e84f9b275eb00",
    measurementId: "G-BWVQ1S172B"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
