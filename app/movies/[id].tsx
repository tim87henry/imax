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

  // console.log(movie)
  const release_date = new Date(movie.release_date)

  interface MovieInfoProps {
    label: string;
    value: string | number | null;
  }

  const MovieInfo = ({ label, value}: MovieInfoProps) => (
    <View className='flex-col '>
      <Text className='text-light-200 text-sm mt-4'>{label}</Text>
      <Text className='text-slate-300 text-base mt-2'>{value}</Text>
    </View>
  )

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
          <View className='flex-row items-center gap-x-1.5 rounded-md py-1 mt-2'>
            <Image source={icons.star} className='size-4' />
            <Text className='text-slate-300 text-sm'>{Math.round(movie.vote_average)}/10</Text>
            <Text className='text-slate-300 text-sm'>({movie.vote_count} votes)</Text>
          </View>

          <MovieInfo 
            label='Overview'
            value={movie.overview}
          />
          
          <View className='flex-row justify-between w-full mt-2'>
            <View className='flex-1'>
              <MovieInfo 
                label='Release Date' 
                value={release_date.toLocaleDateString('en-us', {month: 'long', day: 'numeric', year: 'numeric'})}
              />
            </View>
            <View className='flex-1'>
              <MovieInfo 
                label='Status'
                value={movie.status}
              />
            </View>          
          </View>

          <View className='flex-row justify-between w-full mt-2'>
            <View className='flex-1'>
              <MovieInfo 
                label='Budget' 
                value={`$${movie.budget/1000000} million`}
              />
            </View>
            <View className='flex-1'>
              <MovieInfo 
                label='Revenue'
                value={`$${Math.round(movie.revenue/1000000)} million`}
              />  
            </View>          
          </View>

          <View className='flex-col'>
            <Text className='text-light-200 text-sm mt-6'>Genres</Text>
            <View className='flex-row gap-x-3'>
              {movie.genres.map((item) => (
                  <Text 
                    key={item.id} 
                    className='text-slate-300 text-sm mt-4 font-bold bg-slate-700 pr-2 pl-2 pt-0.5 pb-0.5'>
                    {item.name}
                  </Text>
                ))}
            </View>
          </View>

          <View className='flex-col mt-4'>
            <MovieInfo 
              label='Production Companies'
              value={movie.production_companies.map((company) => company.name).join(" • ")}
            />
          </View>

        </View>
      </ScrollView>
    </View>
  )
}

export default MovieDetails