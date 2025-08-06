import { useState, useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import auth from './services/auth'

import Logout from './components/Logout'
import PrivateRouter from './components/PrivateRouter'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import './css/App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      console.log("User state changed:", user);
    });
    return () => unsubscribe(); // cleanup when closed to prevent memory leak
  }, []);

  return (
    <>
      <MovieProvider>
        <NavBar currentUser={currentUser} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={ <PrivateRouter> <Favorites /> </PrivateRouter> } />
          </Routes>
        </main>
      </MovieProvider>
    </>
  )
}

export default App
