import { JsonDataMovie } from "../type/movie";

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM'
    }
  };

export async function PopularMovies(){
    await fetch('https://api.themoviedb.org/3/movie/popular?language=fr-FR&page=1', options)
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
        return json 
    })
    .catch(e => console.warn(e))
}

export async function FavoriteMovies(account_id: string | null | undefined): Promise<JsonDataMovie | null> {
    try {
        return await fetchData('GET', `https://api.themoviedb.org/3/account/${account_id}/favorite/movies`);
    } catch (error) {
        console.warn(error);
        return null;
    }
}




export async function fetchData<D>(method: string, url: string, params?: {}): Promise<D> {
    const token =  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMTgyNGZlYzRkYWVkYjU4ZGU2YzA3MzA3MmViM2M0NiIsInN1YiI6IjY1OTZiY2NlZWY5ZDcyMmJhNjEyYjUyNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dkQIy1fjTsBVn4FcPE2G1y0aE8niaFG6VOrqjYsOJxM"
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            Authorization: `Bearer ${token}`
          }
    }
    return await fetch(url + new URLSearchParams(params), options)
        .then((response) => response.json())
        .then((data) => {return data as D})
        .catch((error) => error);
};