import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store';

export function secureStorage() {
  const set = async (key: string, value: string): Promise<void> => {
    try {
      await setItemAsync(key, value);
    } catch (error) {
      console.log('err', error);
      throw error;
    }
  };

  const get = async (key: string): Promise<string | null> => {
    try {
      return await getItemAsync(key);
    } catch (error) {
      console.log('err', error);
      throw error;
    }
  };

  const remove = async (key: string): Promise<void> => {
    try {
      await deleteItemAsync(key);
    } catch (error) {
      console.log('err', error);
      throw error;
    }
  };

  return {
    set,
    get,
    remove,
  };
}
