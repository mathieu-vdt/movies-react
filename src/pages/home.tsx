import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieI, JsonDataMovie, FavoriteMovieI } from '../type/movie.ts';
import MovieCard from '../component/cardMovie.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import { FavoriteMovies } from '../lib/movie_api.ts';

function Home() {
    const auth = useSelector((state: RootState) => state.auth);
    const isMounted = useRef<boolean>(false);
    const [favorites, setFavorites] = useState<FavoriteMovieI[]>([]); // Use state for favorites
    const [movieKeyword, setMovieKeyword] = useState<string>('');
    const [movies, setMovies] = useState<MovieI[]>([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM',
        },
    };

    async function refreshList(json: JsonDataMovie) {
        const datas = json.results;
        
        if (auth.account_id) {
            try {
                const res = await FavoriteMovies(auth.account_id);
                const results = res?.results || [];
    
                // Update favorites
                setFavorites((prevFavorites) => {
                    const newFavorites = results
                        .filter((movieData) => movieData.poster_path !== null && movieData.poster_path !== '')
                        .map((movieData) => ({
                            id: movieData.id,
                            title: movieData.title,
                        }));
    
                    // Process popular movies
                    const updatedMovies = datas.map((movieData) => {
                        const isFavorite = newFavorites.some((favorite) => favorite.id === movieData.id);
    
                        return {
                            id: movieData.id,
                            title: movieData.title,
                            overview: movieData.overview,
                            poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movieData.poster_path,
                            vote_average: movieData.vote_average,
                            vote_count: movieData.vote_count,
                            is_favorite: isFavorite,
                        };
                    });
    
                    // Update movies
                    setMovies(updatedMovies);
    
                    return newFavorites;
                });
            } catch (error) {
                console.warn(error);
            }
        }else{
            // Clear the existing movie list
            setMovies([]);
        
            // Step 2: Process popular movies
            for (const movieData of datas) {
                const isFavorite = favorites.some((favorite) => favorite.id === movieData.id);
        
                if (movieData.poster_path !== null && movieData.poster_path !== '') {
                    const newMovie: MovieI = {
                        id: movieData.id,
                        title: movieData.title,
                        overview: movieData.overview,
                        poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movieData.poster_path,
                        vote_average: movieData.vote_average,
                        vote_count: movieData.vote_count,
                        is_favorite: isFavorite,
                    };
        
                    // Add the new movie to the list
                    setMovies((prevMovies) => [...prevMovies, newMovie]);
                }
            }
        }
        
    }
    

    useEffect(() => {
        if (!isMounted.current) {
            // Fetch popular movies
            fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
                .then(data => data.json())
                .then(json => {
                    refreshList(json);
                })
                .catch(e => console.warn(e));

            isMounted.current = true;
        }
    }, [auth.account_id, options]);

    useEffect(() => {
        console.log(favorites); // Assurez-vous que favorites a été mis à jour
    }, [favorites]); 

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Appel à l'API avec la valeur du champ texte
            const response = await fetch(
                movieKeyword !== '' && movieKeyword !== null
                    ? `https://api.themoviedb.org/3/search/movie?query=${movieKeyword}&include_adult=false&language=fr-FR&page=1`
                    : 'https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1',
                options
            );

            if (!response.ok) {
                throw new Error('Erreur lors de la requête API');
            }

            const data = await response.json();
            refreshList(data);
        } catch (error) {
            console.warn(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className='search-form'>
                <label>
                    Rechercher :
                    <input type="text" value={movieKeyword} onChange={(e) => setMovieKeyword(e.target.value)} />
                </label>
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className="list-movies">
                {movies.map((m) => (
                    <div key={m.id}>
                        <MovieCard movie={m} />
                        <p>{m.is_favorite}</p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default Home;