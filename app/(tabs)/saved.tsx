import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { fetchSavedMovies } from '@/services/api'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useState } from 'react'
import { FlatList, Image, Text, View } from 'react-native'
import SavedCard from '../components/SavedCard'

const Saved = () => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch movies on mount
  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await fetchSavedMovies();
      setMovies(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadMovies();
    }, [])
  );

  return (
    <View className="flex-1 bg-primary">
      <Image source={images.bg} className="absolute w-full z-0" />
      <>
        <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        <Text className="text-white text-lg font-bold mb-8 px-5 mt-14">Watchlist</Text>
        <FlatList 
          data={movies}
          numColumns={3}
          renderItem={({item, index}) => (
            <SavedCard 
              movie_id = {item.id.toString()}
              title = {item.title}
              poster_url = {item.poster_path}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          columnWrapperStyle={{
            justifyContent: 'flex-start',
            gap: 20,
            paddingRight: 5,
            marginBottom: 10
          }}
          className="mt-2 pb-32"
          scrollEnabled={true}
        />
      </>
    </View>
  )
}

export default Saved