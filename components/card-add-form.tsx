import { Pressable, Text, TextInput, View } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { addCard } from "helpers/process-cards";
import { updateNotifications } from "helpers/notification-service";

export default function CardAddForm() {
    // create a form to add a new card
    const [cardData, setCardData] = useState({
        cardName: '',
        dueDate: '',
    });

    // router
    const router = useRouter();
    
    async function handleSaveCard(){
        if(!cardData.cardName || !cardData.dueDate){
            alert('Please fill in all fields');
            return;
        }
        let payload = {
            id: Date.now().toString(),
            cardName: cardData.cardName,
            dueDate: Number.parseInt(cardData.dueDate),
            lastPayment: null,            
        };

        addCard({ data: payload });
        
        // Update scheduled notifications with new card data
        await updateNotifications();
        
        router.push('/home');
    }

    return(
        <View>
            <View className='flex flex-col gap-4 p-4'>
                <View>
                    <Text>Card Name <Text className="text-red-500">*</Text></Text>
                    <TextInput className="border-b border-gray-300 rounded p-2 mb-4"
                        placeholder="Enter card name"
                        value={cardData.cardName}
                        onChangeText={(text: string) => setCardData({...cardData, cardName: text})}
                    />
                </View>
                
                <View>
                    <Text>Due Date <Text className="text-red-500">*</Text></Text>
                    <TextInput className="border-b border-gray-300 rounded p-2 mb-4"
                        placeholder="Enter monthly due date"
                        inputMode="numeric"
                        value={cardData.dueDate} onChangeText={(text: string) => setCardData({...cardData, dueDate: text})}
                    />
                </View>
                <View className="flex flex-row gap-4">
                    <Pressable className="bg-red-700 rounded-lg p-3 items-center justify-center mt-4 flex-grow" onPress={handleSaveCard}>
                        <Text className="text-white font-bold text-lg">Add Card</Text>
                    </Pressable>
                    <Pressable className="bg-gray-300 rounded-lg p-3 items-center justify-center mt-4 flex-grow" onPress={() => router.back()}>
                        <Text className="text-gray-700 font-bold text-lg">Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}