import { icons } from '@/constants/icons';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

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

  console.log(movie)
  return (
    <View className='flex-1 bg-primary'>
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          <Image 
            source={{uri: posterUrl}}
            className='w-full h-[550px]'
            resizeMode='stretch'
          />
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie.title}</Text>
          <View className='flex-row items-center gap-x-2 mt-2'>
            <Text className='text-light-200 text-sm'>{movie.release_date.split("-")[0]}</Text>
            <Text className='text-light-200 text-sm'>{movie.runtime}m</Text>
          </View>
          <View className='flex-row items-center gap-x-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-white mt-2 text-sm'>{Math.round(movie.vote_average)}/10</Text>
            <Text className='text-white mt-2 text-sm'>({movie.vote_count} votes)</Text>
          </View>
          <View className='flex-col'>
            <Text className='text-light-200 text-sm mt-4'>Overview</Text>
            <Text className='text-light-200 text-base mt-4 font-bold'>{movie.overview}</Text>
          </View>
          <View className='flex-col'>
            <Text className='text-light-200 text-sm mt-4'>Genres</Text>
            <View className='flex-row gap-x-3'>
              {movie.genres.map((item) => (
                  <Text className='text-light-200 text-base mt-4 font-bold'>
                    {item.name}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails