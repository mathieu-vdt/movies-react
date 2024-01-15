export interface MovieI {
    id?: number
    title?: string
    overview?: string
    poster_path?: string
    vote_average?: string
    vote_count?: number
    is_favorite?: boolean 
}

export interface FavoriteMovieI {
    id?: number
    title?: string
}

export interface JsonDataMovie {
    results: MovieI[];
}
