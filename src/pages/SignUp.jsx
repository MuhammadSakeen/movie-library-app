import React, { useState } from "react"
import { createUserWithEmailAndPassword } from "firebase/auth"
import auth from "../services/auth.js"

export default function SignUp() {
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await createUserWithEmailAndPassword(email, auth, password)
            console.log("User Signed Up", userCredential.user)
        } catch (err) {
            console.log("Error Message", err.message);
        }
    }

    return (
        <form onSubmit={handleSignUp}>
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Sign Up</button>
        </form>
    )
}