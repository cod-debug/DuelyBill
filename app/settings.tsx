import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function Settings() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold">Settings</Text>
        <Text className="text-gray-600 mt-2">App settings will appear here</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
