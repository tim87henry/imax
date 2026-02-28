import { Client, Databases } from "react-native-appwrite";

export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}}`
    }
}

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const SAVED_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_TABLE_ID!;

export const fetchMovies = async ({query}:{query: string}) => {
    const endpoint = query
        ? `${TMDB_CONFIG.BASE_URL}/search/movie?api_key=${TMDB_CONFIG.API_KEY}&query=${encodeURIComponent(query)}`
        : `${TMDB_CONFIG.BASE_URL}/discover/movie?api_key=${TMDB_CONFIG.API_KEY}&sort_by=popularity.desc`;

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    // console.log(response)

    if(!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
}

export const fetchMovie = async ({id}:{id: string}) => {
    const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key=${TMDB_CONFIG.API_KEY}`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers: TMDB_CONFIG.headers,
    });

    // console.log(response)

    if(!response.ok) {
        throw new Error('Failed to fetch movies');
    }

    const data = await response.json();
    return data.results;
}

export const fetchSavedMovies = async () => {

    const client = new Client()
        .setEndpoint('https://syd.cloud.appwrite.io/v1')
        .setProject(PROJECT_ID);

    const database = new Databases(client);
    type Movie = {
        id: number;
        title: string;
        poster_path: string;
    };
    const movies: Movie[] = [];

    const result = await database.listDocuments(DATABASE_ID, SAVED_TABLE_ID)
    return result.documents.map((movie) => ({
        id: movie.movie_id,
        title: movie.title,
        poster_path: movie.poster_url
    }))
}