import React, {useEffect, useRef, useState} from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MovieI, JsonDataMovie } from '../type/movie.ts';
import MovieCard from '../component/cardMovie.tsx';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store.ts';
import { FavoriteMovies } from '../lib/movie_api.ts';

function Home() {
    
    const auth = useSelector((state: RootState) => state.auth);
    const isMounted = useRef<boolean>(false)
    const favoritesID: (number | undefined)[] = []
    const [movieKeyword, setMovieKeyword] = useState<string>('');
    const [movies, setMovies] = useState<MovieI[]>([])
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
            let isfav = false;
            if(movieData.poster_path !== null && movieData.poster_path !== ''){ // Eviter d'afficher les films sans images
                const newMovie: MovieI = {
                    id: movieData.id,
                    title: movieData.title,
                    overview: movieData.overview,
                    poster_path: 'https://www.themoviedb.org/t/p/w220_and_h330_face/' + movieData.poster_path,
                    vote_average: movieData.vote_average,
                    vote_count: movieData.vote_count,
                    is_favorite: isfav
                };
        
                // Add the new movie to the list
                setMovies((prevMovies) => [...prevMovies, newMovie]);
            }
        }
    }

    useEffect(() => {
        if (auth.account_id) {
            FavoriteMovies(auth.account_id).then((res) => {
                const results = res?.results
                for(const i in results){
                    favoritesID.push(results[i].id)
                }
            });
        }
        
        if (!isMounted.current) {
            fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
                .then(data => {
                    if (!data.ok) {
                       if (data.status === 401) {
                           fetch('refresh-token')
                               .then(() => {})
                       }
                    }
                   return data.json()
                })
                .then(json => {
                    refreshList(json)
                    
                })
                .catch(e => console.warn(e))
            isMounted.current = true
        }
    }, []);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        try {
          // Appel à l'API avec la valeur du champ texte
          let response = null
          if(movieKeyword !== '' && movieKeyword !== null){
            response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movieKeyword}&include_adult=false&language=fr-FR&page=1`, options);
          }else{
            response = await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options);
          }
        
          if (!response.ok) {
            throw new Error('Erreur lors de la requête API');
          }
      
          const data = await response.json();
          console.log(data)
          refreshList(data)
        } catch (error) {
          console.warn(error);
        }
      };

    return (
        <>
            <form onSubmit={handleSubmit} className='search-form'>
                <label>
                Rechercher :<input type="text" value={movieKeyword} onChange={(e) => setMovieKeyword(e.target.value)} />
                </label>
                <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
            </form>
            <div className="list-movies">
                {movies.map(m => 
                    <MovieCard key={m.id} movie={m} />
                )}
            </div>
        </>
    );
}

export default Home;