import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
  return (
    <SafeAreaView style={{ flex: 1 }} className='gap-8 bg-red-600'>
      <Text className='mt-4 px-8 text-2xl font-bold text-white'>Hello, John</Text>
      <View
        className='mt-4 flex-grow bg-white px-4 py-4'
        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingTop: 16 }}>
        <ScrollView>
            <Text className='mt-2 font-bold text-gray-600'>Payment Status Overview</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 23, justifyContent: 'center' }}>
                <View className='mt-4 w-1/2 bg-green-600 rounded justify-center py-4 px-4' style={{ aspectRatio: 1 }}>
                    <Text className='text-white text-center'>Paid This Month:</Text>
                    <Text className='text-center font-bold text-white' style={{ fontSize: 32 }}>2</Text>
                </View>
                <View className='mt-4 w-1/2 bg-red-600 rounded justify-center py-4 px-4' style={{ aspectRatio: 1 }}>
                    <Text className='text-white text-center'>Due Soon:</Text>
                    <Text className='text-center font-bold text-white' style={{ fontSize: 32 }}>1</Text>
                </View>
            </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
