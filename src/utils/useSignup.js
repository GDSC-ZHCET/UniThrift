import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

export const signUp = async (email, password, username, navigate, additionalData = {}) => {
  try {
    // Step 1: Create Firebase Auth user account
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Step 2: Update Auth Profile with Username
    await updateProfile(user, {
      displayName: username,
      // photoURL can be added here if you have avatar functionality
    });

    // Step 3: Create a user document in Firestore with additional info
    const userDocRef = doc(db, "users", user.uid);
    
    // Combine basic data with additional data
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: username,
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp(),
      ...additionalData
    };

    // Store user data in Firestore
    await setDoc(userDocRef, userData);

    console.log("User created successfully with additional data");
    return { success: true };
    
  } catch (error) {
    console.error("Error signing up:", error.message);
    return { success: false, error: error.message };
  } finally {
    // Only navigate if there was no error
    navigate('/');
  }
};