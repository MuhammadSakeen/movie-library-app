import { getFavorites, addFavorite, removeFavorite } from "../services/favorites";
import { auth } from "../services/firebase";
import { useEffect, useState, createContext, useContext } from "react";

const MovieContext = createContext();

export function MovieProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                setUserId(null);
                setFavorites([]);
            }
        });
        return unsubscribe;
    }, []);

    // Load favorites from Firestore when userId changes
    useEffect(() => {
        console.log("User ID in context:", userId);
        if (userId) {
            getFavorites(userId).then(setFavorites).catch(e => console.error("getFavorites error:", e));
        } else {
            setFavorites([]);
        }
    }, [userId]);

    function isFavorite(movieId) {
        return favorites.some((movie) => movie.id === movieId);
    }

    async function addToFavorites(movie) {
        if (!userId) {
            alert("Please login to add favorites");
            return;
        }
        await addFavorite(userId, movie);
        setFavorites((prev) => [...prev, movie]);
    }

    async function removeFromFavorites(movieId) {
        if (!userId) {
            alert("Please login to remove favorites");
            return;
        }
        const movieToRemove = favorites.find((m) => m.id === movieId);
        if (!movieToRemove) return;
        await removeFavorite(userId, movieToRemove);
        setFavorites((prev) => prev.filter((m) => m.id !== movieId));
    }

    return (
        <MovieContext.Provider value={{ favorites, isFavorite, addToFavorites, removeFromFavorites }}>
            {children}
        </MovieContext.Provider>
    );
}

export function useMovieContext() {
    return useContext(MovieContext);
}
