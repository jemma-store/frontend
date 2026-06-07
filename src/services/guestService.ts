import { v4 as uuidv4 } from 'uuid';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';

const getOrCreateGuestId = (): string => {
  const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});

  let guestId = cookies[LocalStorage.GUEST_ID];
  
  if (!guestId) {
    guestId = uuidv4();
    
    localStorageService.setItem(LocalStorage.GUEST_ID, guestId);
    
    document.cookie = `${LocalStorage.GUEST_ID}=${guestId}; path=/; max-age=${30 * 24 * 60 * 60}`;
  }

  return guestId;
};

const removeGuestId = () => {
  document.cookie = "guestId=; Max-Age=0; path=/";
};

export {
  getOrCreateGuestId,
  removeGuestId
}