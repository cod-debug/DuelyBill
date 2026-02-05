import { Text, View } from "react-native";
import CardItem from "./card-item";
import { useState, useEffect } from "react";
import { getData } from "helpers/async-storage";

export default function CardList() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        getData('cards').then(storedCards => {
            if (storedCards) {
                const sorted = storedCards.sort((a: any, b: any) => a.dueDate - b.dueDate);
                setCards(sorted);
            }
        });
    }, []);
    return(
        <View>
            <Text className="text-lg font-bold text-gray-700">Your Cards</Text>
            <View className="flex gap-4">
                {
                    cards?.length === 0 && (
                        <Text className="text-gray-500 mt-2">No cards added yet.</Text>
                    )
                }

                {
                    cards?.length > 0 && cards.map((card: any, index: number) => (
                        <CardItem 
                            data={card}
                            key={card.id} />
                    ))
                }
            </View>
        </View>
    )
}