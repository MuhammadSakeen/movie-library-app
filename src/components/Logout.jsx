import { signOut } from "firebase/auth"
import auth from "../services/auth"

export default function Logout () {
    const handleLogout = async () => {
        try {
            await signOut(auth)
            console.log("User Logged Out")
        } catch (err) {
            console.error("Logout error:", error.message);
        }
    }
    return <button onClick={handleLogout}>Logout</button>;
}