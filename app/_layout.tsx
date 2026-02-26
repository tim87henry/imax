import { Stack } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import Toast from 'react-native-toast-message';
import './globals.css';

export const toastConfig = {
  success: ({ text1, text2 }: any) => (
    <View
      style={{
        width: '90%',
        backgroundColor: '#000000',
        borderLeftWidth: 6,
        borderLeftColor: '#b8f2ac',
        padding: 16,
        borderRadius: 14,
      }}
    >
      <Text style={{ color: '#b8f2ac', fontWeight: 'bold', fontSize: 16 }}>
        {text1}
      </Text>
      {text2 && (
        <Text style={{ color: 'white', marginTop: 4 }}>
          {text2}
        </Text>
      )}
    </View>
  ),

  info: ({ text1, text2 }: any) => (
    <View
      style={{
        width: '90%',
        backgroundColor: '#000000',
        borderLeftWidth: 6,
        borderLeftColor: '#d65493',
        padding: 16,
        borderRadius: 14,
      }}
    >
      <Text style={{ color: '#d65493', fontWeight: 'bold', fontSize: 16 }}>
        {text1}
      </Text>
      {text2 && (
        <Text style={{ color: 'white', marginTop: 4 }}>
          {text2}
        </Text>
      )}
    </View>
  ),
};

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }}/>
          <Stack.Screen
          name="movies/[id]"
          options={{
            headerShown: false
          }}/>
      </Stack>
      <Toast config={toastConfig} />
    </>
  )
}
