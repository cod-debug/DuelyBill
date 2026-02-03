import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Cards() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">My Cards</Text>
        <Text className="text-gray-600 mt-2">Your credit cards will appear here</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
