import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "../services/auth.js"
import { useNavigate } from "react-router-dom"
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
            setError(err.message)
        }
    }

    return (
        <div className="login-container">
            <form className="login-box" onSubmit={handleLogin}>
            <h2>Welcome Back!</h2>
                <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Login</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    )
}