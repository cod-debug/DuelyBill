import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { registerForPushNotificationsAsync, scheduleDailyNotificationCheck } from '../helpers/notification-service';
import '../global.css';

// how to adjust the animation when navigating between screens in expo-router

export default function RootLayout() {
  useEffect(() => {
    // Initialize notifications on app startup
    const initializeNotifications = async () => {
      // Request notification permissions
      await registerForPushNotificationsAsync();
      
      // Schedule daily notifications at 10am and 3pm
      await scheduleDailyNotificationCheck();
      console.log('Scheduled notifications initialized for 10:00 AM and 3:00 PM');
    };

    initializeNotifications();
  }, []);

  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ animation: 'none' }}>
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false }} />
        <Stack.Screen name="home" options={{ title: 'Home Screen', headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Register', headerShown: false }} />
        <Stack.Screen name="cards" options={{ title: 'My Cards' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
