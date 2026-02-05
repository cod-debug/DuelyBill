import CardList from 'components/card-list';
import PaymentStatusOverview from 'components/payment-status-overview';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Separator from 'components/separator';
import UserHeader from 'components/user-header';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPaidAndUpcomingPayments } from 'helpers/process-cards';
import { getData } from 'helpers/async-storage';

type CardData = {
    id: string,
    cardName: string,
    lastPayment: string | null,
    dueDate: number,
}

export default function Home() {
  const router = useRouter();
  const [paymentStatus, setPaymentStatus] = useState({
    paidThisMonth: 0,
    dueSoon: 0,
  });

  function handleRedirect(path: string) {
    router.push(path);
  }

  useEffect(() => {
    let cards: CardData[] = [];
    getData('cards').then((storedCards) => {
      if (storedCards) {
        cards = storedCards;
      }
      const statusCounts = getPaidAndUpcomingPayments(cards);
      setPaymentStatus({
        paidThisMonth: statusCounts.paidCards,
        dueSoon: statusCounts.upcomingCards,
      });
    });
  }, []);
  
  return (
    <SafeAreaView style={{ flex: 1 }} className='gap-4 bg-red-600'>
      <UserHeader />
      <View
        className='flex-grow bg-white px-4 py-4'
        style={{ borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingTop: 16 }}>
        <View className='flex flex-grow'>
          <PaymentStatusOverview paidThisMonth={paymentStatus.paidThisMonth} dueSoon={paymentStatus.dueSoon} />

          <Separator />
          <ScrollView className='flex-grow'>
            <CardList />
          </ScrollView>
          <Separator />
          
          <Pressable onPress={() => {handleRedirect('/cards-add')}} className='mt-4 items-center justify-center rounded-lg bg-red-700 p-3'>
            <Text className='text-white'>Add Card</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
