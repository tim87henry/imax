import { images } from '@/constants/images';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';

const MovieDetails = () => {

  const {id} = useLocalSearchParams<{ id: string}>();
  const [movie, setMovie] = useState<any>(null);
  const API_KEY = process.env.EXPO_PUBLIC_MOVIE_API_KEY;

  useEffect(() => {
    if (!id) return
    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    .then(res => res.json())
    .then(setMovie);
  }, [id])

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : 'https://placehold.co/600x400/1a1a1a/FFFFFF.png';

  return (
    <View className='flex-1 bg-primary'>
      <Image source={images.bg} className='flex-1 absolute w-full z-0' 
      resizeMode='cover' />
      <View className='mt-52 ml-10 mr-10'>
        <Text className='font-bold text-white'>{movie.title} ({Math.round(movie.vote_average)}/10)</Text>
        <Text className='font-light mt-4 text-white'>{movie.overview}</Text>
        <Image 
          source={{uri: posterUrl}}
          className='w-full h-full rounded-lg mt-12'
          resizeMode='none'
        />
      </View>
    </View>
  )
}

export default MovieDetails