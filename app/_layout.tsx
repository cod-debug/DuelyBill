import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Home Screen', headerShown: false }} />
        <Stack.Screen name="cards" options={{ title: 'My Cards' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
