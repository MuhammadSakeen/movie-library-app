import { Link } from "react-router-dom"
import '../css/NavBar.css'

export default function NavBar () {
    return (
        <nav className="Navbar">
            <div className="navbar-brand">
                <Link to="/">Movies Library</Link>
            </div>
            <div className="navbar-links">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/favorites">Favorites</Link>
            </div>
        </nav>
    )
}