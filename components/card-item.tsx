import { useRouter } from "expo-router";
import { deleteCard, payCard } from "helpers/process-cards";
import { Pressable, Text, View } from "react-native";

type CardData = {
    id: string,
    cardName: string,
    lastPayment: string | null,
    dueDate: number,
}

export default function CardItem({ data } : { data: CardData }) {
  const router = useRouter();
  const month = new Date().getMonth();
  const day = data.dueDate;
  const year = new Date().getFullYear();

  const dueDate = new Date(year, month, day);
  const dueDateFormatted = dueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // something like February 2, 2026

  function handleDelete() {
    deleteCard({ id: data.id });
    router.push('/home');
  }

  function handlePayCard(){
    payCard({ id: data.id });
    router.push('/home');
  }
  return (
    <View className="relative">
      <View className="mt-2 flex flex-row items-center gap-4 rounded-2xl border border-gray-300 bg-slate-100 p-4">
        <View className="flex-grow">
          <Text className="text-lg font-bold text-red-800">{data.cardName}</Text>
          <Text className="text-red-600">Due: {dueDateFormatted}</Text>
          <Text className="text-gray-800">Last Payment: {data.lastPayment ? new Date(data.lastPayment).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "No payments yet"}</Text>
        </View>
        <View className="w-20">
          <Pressable onPress={handlePayCard}>
            <Text className="rounded-lg bg-green-700 py-2 text-center text-white">Pay</Text>
          </Pressable>
        </View>
      </View>
      <View className="absolute -right-0 -top-[0.5px]">
        <Pressable className="h-5 w-5 items-center justify-center rounded-full bg-red-500" onPress={handleDelete}>
          <Text className="font-bold text-white text-xs">X</Text>
        </Pressable>
      </View>
    </View>
  );
}
