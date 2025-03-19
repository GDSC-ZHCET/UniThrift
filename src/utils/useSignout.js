import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const signout = async () => {
    try {
        await signOut(auth);
        // console.log("User signed out");
        return { success: true };
    } catch (error) {
        console.error("Error signing out:", error.message);
        return { success: false, error: error.message };
    }
};