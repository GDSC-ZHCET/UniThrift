import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    // console.log("User signed in:", userCredential.user);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error("Error signing in:", error.message);
    return { success: false, error: error.message };
  }
};

export { signIn };