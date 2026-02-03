import { Image, Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
    const router = useRouter();

    return(
        <View className="flex-1 gap-2">
            <View>
                <Text className="text-2xl font-bold text-red-600 text-center">DuelyBill Tracker</Text>
                <Text className="text-center text-red-500 text-lg">Track Your Credit Card Payments</Text>
            </View>
            <View className="flex-grow justify-center px-4">
                <Image source={require('../assets/icon.png')} className="w-full h-3/4 rounded-lg" />
                <Text className="text-center font-bold mt-2 text-red-500 text-lg">Never Miss a Payment Again!</Text>
            </View>
            <View className="px-8 gap-3">
                <Pressable 
                    className="bg-red-600 rounded-lg py-3"
                    onPress={() => router.push('/cards')}
                >
                    <Text className="text-center text-white font-bold">View My Cards</Text>
                </Pressable>
                <Pressable 
                    className="bg-gray-200 rounded-lg py-3"
                    onPress={() => router.push('/settings')}
                >
                    <Text className="text-center text-gray-700 font-bold">Settings</Text>
                </Pressable>
            </View>
        </View>
    )
}