import '../css/MovieCard.css'
import { useMovieContext } from '../contexts/MovieContext'

export default function MovieCard({ movie }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useMovieContext()
    const favorite = isFavorite(movie.id)

    function onFavoriteClick(e) {
        console.log("Favorite button clicked for adding favorite movies:", movie.id);
        e.preventDefault()
        if (favorite) {
            console.log("Removing fav");
            removeFromFavorites(movie.id)
        } else {
            console.log("Adding favorite");
            addToFavorites(movie)
        }
    }

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                <div className="movie-overlay">
                    <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{movie.release_date?.split("-")[0]}</p>
            </div>
        </div>
    )
}