import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/AppError";
import { groupsGetAll } from "./groupsGetAll";

export async function groupCreate(newGroupName: string) {
    try {

        const storedGroups = await groupsGetAll();

        const groupAlreadyExists = storedGroups.includes(newGroupName);

        if (groupAlreadyExists) {
            throw new AppError("Grupo com esse nome já existe");
        }

        const storage = JSON.stringify([...storedGroups, newGroupName]);

        await AsyncStorage.setItem(GROUP_COLLECTION, storage);
    } catch (error) {
        throw error;
    }
}