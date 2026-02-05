import { useRouter } from "expo-router";
import { getData, saveData } from "helpers/async-storage";
import { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    useEffect(() => {
        getData('firstName').then(name => {
            if (name) {
                setFirstName(name);
            }
        });
        getData('email').then(mail => {
            if (mail) {
                setEmail(mail);
            }
        });
    }, []);

    function handleSave() {
        saveData('firstName', firstName);
        saveData('email', email);
        saveData('isRegistered', 'true');
        router.push('/home');
    }
    return(
        <View className="flex gap-8 p-4">
            <View>
                <Text className="text-lg text-gray-700">First Name: </Text>
                <TextInput className="border-b border-gray-500" value={firstName} onChangeText={setFirstName} placeholder="Enter your first name" />
            </View>
            <View>
                <Text className="text-lg text-gray-700">Email Address: </Text>
                <TextInput className="border-b border-gray-500" value={email} onChangeText={setEmail} placeholder="Enter your email address" />
            </View>
            <View>
                <Pressable onPress={handleSave}>
                    <Text className="w-full p-2 bg-red-700 text-white rounded-lg text-center text-xl">Save</Text>
                </Pressable>
            </View>
        </View>
    )
}