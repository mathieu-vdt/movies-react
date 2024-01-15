
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieCard from '../component/cardMovie';
import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { RootState } from '../app/store';
import { JsonDataMovie, MovieI } from '../type/movie';
import { FavoriteMovies } from '../lib/movie_api';
import { useNavigate } from 'react-router-dom';

function Favourites() {
    const auth = useSelector((state: RootState) => state.auth);
    const isMounted = useRef<boolean>(false)
    const [movieKeyword, setMovieKeyword] = useState<string>('');
    const [movies, setMovies] = useState<MovieI[]>([]);
    const navigate = useNavigate();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM'
        }
      };
    

    function refreshList(json: JsonDataMovie) {
        let datas = json.results;
    
        // Clear the existing movie list
        setMovies([]);
    
        for (let movieIndex in datas) {
            const movieData = datas[movieIndex];
    
            if(movieData.poster_path !== null && movieData.poster_path !== ''){ // Eviter d'afficher les films sans images
                const newMovie: MovieI = {
                    id: movieData.id,
                    title: movieData.title,
                    overview: movieData.overview,
                    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movieData.poster_path,
                    vote_average: movieData.vote_average,
                    vote_count: movieData.vote_count,
                    is_favorite: true
                };
        
                // Add the new movie to the list
                setMovies((prevMovies) => [...prevMovies, newMovie]);
            }
        }
    }

    useEffect(() => {
        if (!isMounted.current) {
            if (!isMounted.current) {
                if (!auth.account_id) {
                    // Redirect to /login if account_id is null
                     navigate('/login');
                } else {
                    FavoriteMovies(auth.account_id).then((res) => {
                        refreshList(res);
                    });
                    isMounted.current = true;
                }
            }
        }
    }, [auth.account_id, history]);
    return (
        <>
            <h1>Mes favoris</h1>
            <div className="list-movies">
                {movies.map(m => 
                    <MovieCard key={m.id} movie={m} />
                )}
            </div>
        </>
    );
}

export default Favourites;