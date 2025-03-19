import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


export const signUp = async (email, password, username, navigate) => {
  
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // console.log("User created:", userCredential.user);

    const user = userCredential.user;

    // Step 2: Update Profile with Username & Avatar
    await updateProfile(user, {
      displayName: username,
      // photoURL: avatarUrl
    });
  } catch (error) {
    console.error("Error signing up:", error.message);
  }finally{
    navigate('/');
  }
};
