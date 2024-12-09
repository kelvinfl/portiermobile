import * as SecureStore from "expo-secure-store";


export function useStorage() {
  const set = async (key: string, value: string): Promise<void> => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      console.error("[STORAGE] Error saving data:", error);
      throw error;
    }
  };

  const get = async (key: string): Promise<string | null> => {
    try {
      const val = await SecureStore.getItemAsync(key);
      if (val) {
        try {
          return JSON.parse(val);
        } catch (e) {
          return val;
        }
      } else {
        return val;
      }
    } catch (error) {
      console.error("[STORAGE] Error loading data:", error);
      throw error;
    }
  };

  const remove = async (key: string): Promise<void> => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error("[STORAGE] Error removing data:", error);
      throw error;
    }
  };

  return {
    set,
    get,
    remove,
  };
}
