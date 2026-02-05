import CardAddForm from "components/card-add-form";
import UserHeader from "components/user-header";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CardsAdd() {
    return(
        <SafeAreaView style={{ flex: 1 }} className='gap-4 bg-red-600'>
            <UserHeader />
            <View className='flex-grow bg-white px-4 py-4'
                style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingTop: 16 }}
            >
                <CardAddForm />
            </View>
        </SafeAreaView>
    )
}