/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

/**
 * Interface dos retornos do hook de local storage.
 */
export interface UseLocalStorage {
  /**
   * Valor salvo no local storage.
   */
  value: any;

  /**
   * Método para alterar o valor no local storage.
   * @param newValue Novo valor.
   */
  updateItemStorage(newValue: any): void;

  /**
   * Método para deletar item do local storage.
   */
  clearItemStorage(): void;
}

/**
 * Hook do local storage.
 * @param key Key identificador do item do local storage.
 * @param defaultValue Valor padrão do item.
 */
const useLocalStorage = (key: string, defaultValue = null): UseLocalStorage => {
  let storageValue: string | null = null;

  if (typeof window !== "undefined") {
    storageValue = localStorage.getItem(key);
  }

  const initialValue = storageValue ? JSON.parse(storageValue) : null;

  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    if (defaultValue) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      setValue(defaultValue);
    }
  }, [defaultValue, key]);

  function updateItemStorage(newValue: unknown) {
    localStorage.setItem(key, JSON.stringify(newValue));

    return setValue(newValue);
  }

  function clearItemStorage() {
    localStorage.removeItem(key);

    return setValue(null);
  }

  return {
    value,
    updateItemStorage,
    clearItemStorage,
  };
};

export default useLocalStorage;
