import { getData, saveData } from "./async-storage";

type CardData = {
    id: string,
    cardName: string,
    lastPayment: string | null,
    dueDate: number,
}

let storedCards: CardData[] = [];

export function setStoredCards():void {
    getData('cards').then((data) => {
        console.log('Fetched cards from storage:', data);
        storedCards = data || [];
    })
}

let formattedCards: CardData[] = storedCards || [];

export function addCard({ data } : { data: CardData }):void {
    formattedCards = [...formattedCards, data];

    saveData('cards', JSON.stringify(formattedCards)).then(() => {
        console.log('Card added and saved to storage:', data);
    });
}

export default function deleteCard({ id } : { id: string }):void {
    formattedCards = formattedCards.filter(card => card.id !== id);
    saveData('cards', JSON.stringify(formattedCards)).then(() => {
        console.log('Card deleted and storage updated. Deleted card ID:', id);
    });
}