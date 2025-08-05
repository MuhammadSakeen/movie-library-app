import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../services/auth.js"
import { useNavigate } from "react-router-dom"
import '../css/Signup.css'

export default function SignUp() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log("User Signed Up", userCredential.user)
            navigate("/")
        } catch (err) {
            console.log("Error Message", err.message);
            setError(err.message)
        }
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp} class="signup-box">
                <h2>Welcome!</h2>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Sign Up</button>
                {error && <p style={{ color: "red" }}> {error} </p>}
            </form>
        </div>
    )
}