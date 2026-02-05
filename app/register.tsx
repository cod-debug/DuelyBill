import RegisterForm from "components/register-form";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
    return(
        <SafeAreaView style={{ flex: 1 }} className='gap-4 bg-red-600'>
          <Text className='mt-4 px-8 text-2xl font-bold text-white'>Please input significant information</Text>
          <View
            className='flex-grow bg-white px-4 py-4'
            style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingTop: 16 }}>
            <ScrollView>
                <RegisterForm />
            </ScrollView>
          </View>
        </SafeAreaView>
    )
}