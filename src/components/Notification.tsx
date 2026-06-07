import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useNotificationStore } from '@/store';

export const Notification = () => {
  const { message, type, clearNotification } = useNotificationStore();

  useEffect(() => {
    if (!message) return;

    toast[type || 'info'](message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      pauseOnHover: true,
      draggable: true,
      onClose: () => clearNotification(),
    });
  }, [message, type, clearNotification]);

  return null;
};
