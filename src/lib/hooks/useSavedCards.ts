import { useEffect, useState } from 'react';

import { LocalStorage } from '@/enums';
import { IPaymentInfo } from '@/types/';

export const useSavedCards = () => {
  const [savedCards, setSavedCards] = useState<IPaymentInfo['cardData'][]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(LocalStorage.CARDS);
    if (raw) {
      try {
        setSavedCards(JSON.parse(raw));
      } catch {
        setSavedCards([]);
      }
    }
  }, []);

  const addCard = (card: IPaymentInfo['cardData']) => {
    const updated = [...savedCards, card];
    setSavedCards(updated);
    localStorage.setItem(LocalStorage.CARDS, JSON.stringify(updated));
  };

  const removeCard = (index: number) => {
    const updated = [...savedCards.slice(0, index), ...savedCards.slice(index + 1)];
    setSavedCards(updated);
    localStorage.setItem(LocalStorage.CARDS, JSON.stringify(updated));
  };

  return {
    savedCards,
    addCard,
    removeCard,
  };
};
