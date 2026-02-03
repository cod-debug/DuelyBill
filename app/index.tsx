import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../components/HomeScreen';

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
