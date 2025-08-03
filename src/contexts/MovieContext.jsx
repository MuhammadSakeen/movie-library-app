import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext)

export const MovieProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])
    useEffect(() => {
        const storedFavs = localStorage.getItem("favorites")
        if (storedFavs) setFavorites(JSON.parse(storedFavs))

    }, [])
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites))
    }, [favorites])

    const addToFavorites = (movie) => {
        setFavorites(prev => {
            if (prev.some(m => m.id === movie.id)) return prev // prevent duplicates
            return [...prev, {
                id: movie.id,
                title: movie.title,
                release_date: movie.release_date,
                poster_path: movie.poster_path
            }]
        })
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId)
    }
    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }
    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    )
}