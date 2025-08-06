import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../services/auth.js"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
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
            console.error("Signup Error:", error.code, error.message);
            alert("Signup failed. Try again.")
        }
    }

    return (
        <div className="signup-container">
            <form onSubmit={handleSignUp} class="signup-box">
                <h2>Welcome!</h2>
                <input type="email" value={email} className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} className="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="submit-button">Sign Up</button>
                <p className="switch-auth-text">
                    Already Have an account?{"   "}
                    <Link to="/login" className="auth-link">Login Here</Link>
                </p>
                {error && <p style={{ color: "red" }}> {error} </p>}
            </form>
        </div>
    )
}