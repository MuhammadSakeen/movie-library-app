import { Link } from "react-router-dom"
import Logout from "./Logout"
import SignUp from "../pages/SignUp"
import '../css/NavBar.css'

export default function NavBar({ currentUser }) {
    return (
        <nav className="Navbar">
            <div className="navbar-left">
                <div className="navbar-brand">
                    <Link to="/">Movies Library</Link>
                </div>

                <div className="navbar-links">
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/favorites">Favorites</Link>
                </div>
            </div>

            <div className="navbar-user">
                {currentUser ? (
                    <>
                        <p className="welcome-text">Welcome, {currentUser.email}</p>
                        <Logout />
                    </>
                ) : (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    )
}