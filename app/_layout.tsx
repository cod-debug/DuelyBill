import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

// how to adjust the animation when navigating between screens in expo-router

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ animation: 'none' }}>
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Home Screen', headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
        <Stack.Screen name="cards-add" options={{ title: 'Add Card', headerShown: false }} />
        <Stack.Screen name="cards" options={{ title: 'My Cards' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
