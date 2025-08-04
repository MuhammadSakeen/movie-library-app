import React, { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import auth from "../services/auth.js"

export default function Login() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(email, auth, password)
            console.log("User Logged In", userCredential.user)
        } catch (err) {
            console.log("Login Error", err.message);
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )
}