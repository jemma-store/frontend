/* eslint-disable @typescript-eslint/no-explicit-any */
export const localStorageService = {
  getItem<T = any>(key: string): T | null {
    const value = localStorage.getItem(key);

    if (!value || value === "undefined") {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch (error) {
      return value as unknown as T;
    }
  },

  setItem<T>(key: string, value: T): void {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error saving to localStorage (key: ${key}):`, error);
    }
  },

  removeItem(key: string): void {
    localStorage.removeItem(key);
  },
};

export const getOrInitSessionId = () => {
  let id = localStorage.getItem("SESSION_ID");
  
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("SESSION_ID", id);
    document.cookie = `guest_id=${id}; path=/; max-age=31536000`;
  }
  
  return id;
};