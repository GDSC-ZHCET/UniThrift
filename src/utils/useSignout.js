import { signOut } from "firebase/auth";

const signout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error.message);
  }
};
