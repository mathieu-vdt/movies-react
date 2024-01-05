import { Link } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieI } from '../type/movie';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { fetchData } from '../lib/movie_api';

interface MovieCardProps {
    movie: MovieI;
    favourite: boolean
}

function MovieCard(m: MovieCardProps) {
    const auth = useSelector((state: RootState) => state.auth);
    const [isFavorite, setIsFavorite] = useState(m.favourite);

    const handleFavoriteClick = (id: number | undefined) => {
        setIsFavorite((prevIsFavorite) => !prevIsFavorite);

        if(auth.account_id !== '' && auth.account_id !== null){
            const bodyJSON = {
                "media_type": "movie",
                "media_id": id,
                "favorite": !isFavorite
            };
            const token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM"
            const options = {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(bodyJSON)
            }
            fetch(` https://api.themoviedb.org/3/account/${auth.account_id}/favorite`, options)
                .then((response) => response.json())
                .then((data) => {console.log(data)})
                .catch((error) => error);
        }else{
            alert('Veuillez vous connecter')
        }
    };
    
    return (
        <div className="movie-card">
            <img src={m.movie.poster_path} alt={m.movie.title} />
            <button className={`favourite-icon ${isFavorite ? 'active' : ''}`} onClick={() => handleFavoriteClick(m.movie.id)}>
                <i className="fa-solid fa-heart"></i>
                </button>
            <div className='content-card'>
                <div className="movie-title">{m.movie.title}</div>
            </div>
        </div>
    );
}

export default MovieCard;