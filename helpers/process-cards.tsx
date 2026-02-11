import { getData, saveData } from "./async-storage";
import type { CardData } from "../types";

const currentDate = new Date();
const month = currentDate.getMonth();

function getPaidCards(savedCards: CardData[]): CardData[] {
    return savedCards.filter((card) => {
        if(card.lastPayment){
            const lastPaymentDate = new Date(card.lastPayment);
            const lastPaymentMonth = lastPaymentDate.getMonth();
            const daysSincePayment = getDaysDifference(currentDate, lastPaymentDate);
            
            // Card is considered paid if payment was this month or within last 10 days
            return (lastPaymentMonth === month) || (daysSincePayment <= 10);
        }
        return false;
    })
}

function getUpcomingDueDateCards(savedCards: CardData[]): CardData[] {
    return savedCards.filter((card) => {
        const dueDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), card.dueDate);
        const daysUntilDue = getDaysDifference(currentDate, dueDate);

        return daysUntilDue > 0 && daysUntilDue < 10;
    })
}

export function addCard({ data } : { data: CardData }):void {
    let storedCards: CardData[] = [];

    getData('cards').then((data) => {
        storedCards = data || [];
    });

    let formattedCards: CardData[] = storedCards || [];

    formattedCards = [...formattedCards, data];

    saveData('cards', JSON.stringify(formattedCards)).then(() => {
        console.log('Card added and saved to storage:', data);
    });
}

export function deleteCard({ id } : { id: string }):void {
    let storedCards: CardData[] = [];

    getData('cards').then((data) => {
        storedCards = data || [];
    });

    let formattedCards: CardData[] = storedCards || [];
    formattedCards = formattedCards.filter(card => card.id !== id);
    saveData('cards', JSON.stringify(formattedCards)).then(() => {
        console.log('Card deleted and storage updated. Deleted card ID:', id);
    });
}

export function payCard({ id } : { id: string }):void {
    const paymentDate = new Date().toISOString();

    let storedCards: CardData[] = [];

    getData('cards').then((data) => {
        storedCards = data || [];
    });

    let formattedCards: CardData[] = storedCards || [];

    formattedCards = formattedCards.map(card => {
        if(card.id === id){
            return {
                ...card,
                lastPayment: paymentDate,
            }
        }
        return card;
    });

    saveData('cards', JSON.stringify(formattedCards)).then(() => {
        console.log('Card payment updated and storage updated. Paid card ID:', id);
    });
}

// Helper function to calculate days between two dates
export function getDaysDifference(date1: Date, date2: Date): number {
    const diffTime = date2.getTime() - date1.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

export function getPaidAndUpcomingPayments(savedCards: CardData[]): { paidCards: number, upcomingCards: number } {
    const paidCards = getPaidCards(savedCards).length;
    const upcomingCards = getUpcomingDueDateCards(savedCards).length;
    
    return { paidCards, upcomingCards };
}
