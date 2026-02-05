import { Text, View } from "react-native";

type PaymentStatusOverviewProps = {
    paidThisMonth?: number;
    dueSoon?: number;
}

export default function PaymentStatusOverview({ paidThisMonth = 0, dueSoon = 0 }: PaymentStatusOverviewProps) {
    return(
        <View>
            <Text className='mt-2 font-bold text-gray-600'>Payment Status Overview</Text>
            <View className='flex flex-row gap-4 justify-center px-8'>
                <View className='mt-4 w-1/2 bg-yellow-500 rounded-2xl justify-center py-4 px-4'>
                    <Text className='text-white text-center'>Paid This Month:</Text>
                    <Text className='text-center font-bold text-white' style={{ fontSize: 32 }}>{paidThisMonth}</Text>
                </View>
                <View className='mt-4 w-1/2 bg-red-500 rounded-2xl justify-center py-4 px-4'>
                    <Text className='text-white text-center'>Due Soon:</Text>
                    <Text className='text-center font-bold text-white' style={{ fontSize: 32 }}>{dueSoon}</Text>
                </View>
            </View>
        </View>
    )
}