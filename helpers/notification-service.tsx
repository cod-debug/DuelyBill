import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { getData } from './async-storage';
import type { CardData } from '../types';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Request notification permissions
export async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}

// Helper to calculate days until due date
function getDaysUntilDue(dueDate: number): number {
  const today = new Date();
  const currentDay = today.getDate();
  
  // If due date hasn't passed this month
  if (dueDate >= currentDay) {
    return dueDate - currentDay;
  }
  
  // Due date is next month
  const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, dueDate);
  const diffTime = nextMonth.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Helper to calculate days since last payment
function getDaysSinceLastPayment(lastPayment: string | null): number {
  if (!lastPayment) return Infinity;
  
  const lastPaymentDate = new Date(lastPayment);
  const today = new Date();
  const diffTime = today.getTime() - lastPaymentDate.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

// Check which cards need notifications
export async function getCardsNeedingNotification(): Promise<CardData[]> {
  const cards: CardData[] = (await getData('cards')) || [];
  
  return cards.filter((card) => {
    const daysUntilDue = getDaysUntilDue(card.dueDate);
    const daysSincePayment = getDaysSinceLastPayment(card.lastPayment);
    
    // Notify if: 5 or fewer days until due AND last payment was more than 10 days ago (or never)
    return daysUntilDue <= 5 && daysSincePayment > 10;
  });
}

// Schedule notification at specific time (10am or 3pm)
async function scheduleNotificationAtTime(hour: number, minute: number = 0) {
  const cardsNeedingNotification = await getCardsNeedingNotification();
  
  if (cardsNeedingNotification.length === 0) {
    console.log(`No cards need notifications at ${hour}:${minute.toString().padStart(2, '0')}`);
    return;
  }

  // Build notification message
  const cardNames = cardsNeedingNotification.map((card) => card.cardName).join(', ');
  const count = cardsNeedingNotification.length;
  const title = count === 1 ? '📅 Bill Due Soon!' : `📅 ${count} Bills Due Soon!`;
  const body =
    count === 1
      ? `${cardNames} is approaching its due date. Time to pay!`
      : `${cardNames} are approaching their due dates. Time to pay!`;

  // Schedule daily notification at specific time
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: { cards: cardsNeedingNotification },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
      hour,
      minute,
      repeats: true,
    },
  });

  console.log(`Daily notification scheduled for ${hour}:${minute.toString().padStart(2, '0')}`);
}

// Schedule daily notifications at 10 AM and 3 PM
export async function scheduleDailyNotificationCheck() {
  // Cancel all existing scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  // Check if there are any cards needing notification
  const cardsNeedingNotification = await getCardsNeedingNotification();
  
  if (cardsNeedingNotification.length === 0) {
    console.log('No cards need notifications at this time');
    return;
  }

  // Schedule notification at 10:00 AM
  await scheduleNotificationAtTime(10, 0);
  
  // Schedule notification at 3:00 PM (15:00)
  await scheduleNotificationAtTime(15, 0);

  console.log('Daily notifications scheduled for 10:00 AM and 3:00 PM');
}

// Schedule daily notification at 12 AM (legacy function, kept for backward compatibility)
export async function scheduleMidnightNotificationCheck() {
  // Cancel all existing scheduled notifications
  await Notifications.cancelAllScheduledNotificationsAsync();
  
  const cardsNeedingNotification = await getCardsNeedingNotification();
  
  if (cardsNeedingNotification.length === 0) {
    console.log('No cards need notifications at this time');
    return;
  }

  // Get the next 12 AM
  const now = new Date();
  const nextMidnight = new Date(now);
  nextMidnight.setDate(nextMidnight.getDate() + 1);
  nextMidnight.setHours(0, 0, 0, 0);

  // Calculate seconds until next midnight
  const secondsUntilMidnight = Math.floor((nextMidnight.getTime() - now.getTime()) / 1000);

  // Build notification message
  const cardNames = cardsNeedingNotification.map((card) => card.cardName).join(', ');
  const count = cardsNeedingNotification.length;
  const title = count === 1 ? '📅 Bill Due Soon!' : `📅 ${count} Bills Due Soon!`;
  const body =
    count === 1
      ? `${cardNames} is approaching its due date. Time to pay!`
      : `${cardNames} are approaching their due dates. Time to pay!`;

  // Schedule daily notification at 12 AM
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
      data: { cards: cardsNeedingNotification },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: secondsUntilMidnight,
      repeats: true,
    },
  });

  console.log('Daily notification scheduled for 12 AM');
}

// Schedule immediate notification (for testing or manual triggers)
export async function sendImmediateNotification() {
  const cardsNeedingNotification = await getCardsNeedingNotification();
  
  if (cardsNeedingNotification.length === 0) {
    console.log('No cards need notifications');
    return;
  }

  const cardNames = cardsNeedingNotification.map((card) => card.cardName).join(', ');
  const count = cardsNeedingNotification.length;
  const title = count === 1 ? '📅 Bill Due Soon!' : `📅 ${count} Bills Due Soon!`;
  const body =
    count === 1
      ? `${cardNames} is approaching its due date. Time to pay!`
      : `${cardNames} are approaching their due dates. Time to pay!`;

  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.HIGH,
    },
    trigger: null, // Send immediately
  });
}

// Update notifications when cards change
export async function updateNotifications() {
  await scheduleDailyNotificationCheck();
}
