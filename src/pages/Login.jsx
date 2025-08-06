import React, { useState } from "react"
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth"
import auth from "../services/auth.js"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "../css/Login.css"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError(null)
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            console.log("User Logged In", userCredential.user)
            navigate("/")
        } catch (err) {
            console.log("Login Error", err.message);
            alert("Login failed. Please check your credentials.");
        }
    }

    const handleForgotPassword = async () => {
        if (!email) {
            alert("please enter your email!")
            return
        }
        try {
            await sendPasswordResetEmail(auth, email)
            alert("password reset message is sent to your mail")
        } catch (err) {
            console.log(err.message)
            alert("Failed to send reset mail, check your email then try again")
        }
    }

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
                <h2>Welcome Back!</h2>
                <input type="email" value={email} className="input-field" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} className="input-field" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <p className="forgot-pass-text">
                    <span onClick={handleForgotPassword} className="auth-link">
                        Forgot Password?
                    </span>
                </p>
                <button type="submit" className="submit-button">Login</button>
                <p className="switch-auth-text">
                    New User?{"   "}
                    <Link to="/signup" className="auth-link">SignUp Here</Link>
                </p>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}