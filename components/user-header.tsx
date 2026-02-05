import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import { getData } from "helpers/async-storage";

export default function UserHeader(){
    const [userName, setUserName] = useState('Anonymous');
    const router = useRouter();

    useEffect(() => {
        // Simulate fetching user data
        getData('firstName').then(user => {
        if (user && user) {
            setUserName(user);
        }
        });
    }, []);

    function handleRedirect(path: string) {
        router.push(path);
    }
  
    return(
        <View className='flex-row items-center justify-between px-8'>
            <Text className='mt-4 text-2xl font-bold text-white'>Hello, {userName}</Text>
            <TouchableOpacity className='mt-4' onPress={() => {handleRedirect('/register')}}>
                <Ionicons name="person-circle" size={24} color="white" />
            </TouchableOpacity>
        </View>
    )
}