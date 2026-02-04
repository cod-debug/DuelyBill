import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key: string, value: string) => {
    await AsyncStorage.setItem(key, value);
}

export const getData = async (key: string) => {
    const value = await AsyncStorage.getItem(key);
    const isJson = isJsonString(value);
    if(isJson){
        return value ? JSON.parse(value) : null;
    } else {
        return value ? value : null;
    }
}

export const removeData = async (key: string) => {
    await AsyncStorage.removeItem(key);
}

const isJsonString = (str: string | null) => {
  if (typeof str !== "string") {
    return false;
  }

  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
};