import MovieCard from "../components/MovieCard.jsx"
import { searchMovies, getPopularmovies } from "../services/api.js"
import '../css/Home.css'
import { useState, useEffect } from "react"

export default function Home() {
    const [searchQuery, setSearchQuery] = useState("")
    const [movies, setMovies] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const loadPopularMovies = async () => {
            try {
                const popularmovies = await getPopularmovies()
                setMovies(popularmovies)
            } catch (err) {
                console.log(err)
                setError("Can't Load the Movies")
            } finally {
                setLoading(false)
            }
        }
        loadPopularMovies()
    }, [])

    const handleSearch = async (e) => {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return 
        setLoading(true)
        try {
            const searchResults = await searchMovies(searchQuery)
            setMovies(searchResults)
            setError(null)
        } catch (err) {
            console.log(err)
            setError("Can't Search the Movie...")
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Search for Movies"
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" type="submit">Search</button>
            </form>
            {error && <div className="error-messaage">{error}</div>}
            {loading ? 
                (<div className="loading">Loading...</div>) : 
                    <div className="movies-grid">
                        {movies.map(movie => (
                            (<MovieCard movie={movie} key={movie.id} />)
                        ))}
                </div>
            }
        </div>
    )
}