import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeScreen from '../components/WelcomeScreen';

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WelcomeScreen />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
