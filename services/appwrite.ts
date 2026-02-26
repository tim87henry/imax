import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const PROJECT_ID = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;
const SAVED_TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_TABLE_ID!;

const client = new Client()
    .setEndpoint('https://syd.cloud.appwrite.io/v1')
    .setProject(PROJECT_ID);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])

        if (result.documents.length > 0) {
            console.log("Updating count")
            console.log(result.documents[0].count)
            await database.updateDocument(DATABASE_ID, COLLECTION_ID, result.documents[0].$id, {
                count: result.documents[0].count + 1
        })
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                title: movie.title,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        })
    }
    } catch (error) {
        console.log("Error accessing search count", error);
        throw error;
    }
}

export const getTrendingMovies = async(): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count')
        ])
        return result.documents as unknown as TrendingMovie[];

    } catch(error) {
        console.log(error)
        throw undefined;
    }
}

export const saveDeleteMovie = async (movie: Movie) => {
    console.log("Movie ID is ",movie.id)
    let action = ""
    try {
        const result = await database.listDocuments(DATABASE_ID, SAVED_TABLE_ID, [
            Query.equal('movie_id', movie.id)
        ])

        if (result.documents.length > 0) {
            // Deleting movie
            await database.deleteDocument(DATABASE_ID, SAVED_TABLE_ID, result.documents[0].$id)
            action="deleted"
        } else {
            // Saving movie
            await database.createDocument(DATABASE_ID, SAVED_TABLE_ID, ID.unique(), {
                movie_id: movie.id,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            })
            action="saved"
        }
    } catch (error) {
        console.log("Error accessing movie", error);
        throw error;
    } finally {
        console.log("Finally ",action)
        return action;
    }
}