import Home from './pages/Home'
import NavBar from './components/NavBar'
import Favorites from './pages/Favorites'
import { Routes, Route } from 'react-router-dom'
import { MovieProvider } from './contexts/MovieContext'
import './css/App.css'

function App() {
  return (
    <>
      <MovieProvider>
        <NavBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </MovieProvider>
    </>
  )
}

export default App
