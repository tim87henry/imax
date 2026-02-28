import { Link } from 'expo-router';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

interface Movie {
    movie_id: string;
    title: string | number | null;
    poster_url: string;
  }

const SavedCard = (movie: Movie) => {
    return (
        <Link href={`/movies/${movie.movie_id}`} asChild>
            <TouchableOpacity className='w-32 relative pl-5'>
                <Image 
                    source={{uri: movie.poster_url}}
                    className="w-32 h-48 rounded-lg"
                    resizeMode="cover"
                />
                <Text className='text-sm font-bold mt-2 text-light-200' numberOfLines={2}>
                    {movie.title}
                </Text>
            </TouchableOpacity>
        </Link>
    )
}

export default SavedCard