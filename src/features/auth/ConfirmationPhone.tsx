import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';

import { AppRoute } from '@/enums';
import { useModalStore } from '@/store/useModalStore';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useAuth } from '@/lib/hooks/useAuth';

export const PopUpConfirmationPhone = () => {
  const [code, setCode] = useState<string[]>(['', '', '', '']);
  const [showResend, setShowResend] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { pathname } = useLocation();

  const { onVerifyPhoneCode, onVerifyPhoneCodeChange, onVerifyPhoneLogin } = useAuth();
  const {payload} = useModalStore()
  const { openModal, error, close, phone, setError } = useModalStore();

  const isOpen = openModal === 'phoneVerification';

  useEffect(() => {
    if (isOpen) {
      setCode(['', '', '', '']);
      setError(null);
      setShowResend(false);
      setTimeout(() => inputsRef.current[0]?.focus(), 100);
    }
  }, [isOpen, setError]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    setError(null);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }

    onVerifyPhoneCodeChange({ code: newCode.join('') });
  };

  const handleBackspace = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const joined = code.join('');
    if (joined.length < 4) {
      setError('Введіть усі цифри коду');
      return;
    }

    try {
      if (pathname === AppRoute.SIGN_UP) {
        onVerifyPhoneCode({ code: joined }, payload);
      } else {
        onVerifyPhoneLogin({ code: joined }, payload);
      }
    } catch {
      setError('Невірний код');
      setShowResend(true);
    }
  };

  const resendCode = () => {
    setError(null);
    setCode(['', '', '', '']);
    setShowResend(false);
    inputsRef.current[0]?.focus();
  };

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogTrigger className="hidden" />
      <DialogContent className="max-w-[448px] flex flex-col items-center gap-6">
        <DialogTitle className="w-[309px] text-center text-second  font-[500] font-main">
          Підтвердження номеру телефону
        </DialogTitle>
        <DialogDescription className="hidden" />

        <p className="text-center text-grey">
          Введіть код, який було відправлено вам на номер <span>{phone}</span>
        </p>

        <div className="min-w-[164px]">
          <label className="flex gap-4">
            {code.map((digit, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el: HTMLInputElement | null) => {
                  inputsRef.current[i] = el;
                }}
                onChange={(e) => handleChange(e.target.value, i)}
                onKeyDown={(e) => handleBackspace(e, i)}
                className={clsx(
                  'w-8 h-12 text-center text-xl border-b-2 focus-visible:outline-none',
                  error ? 'border-error' : 'border-brown-dark',
                )}
              />
            ))}
          </label>
          {error && <p className="text-error text-center text-[10px] mt-1">{error}</p>}
        </div>

        <DialogFooter className="w-full items-center gap-8">
          <Button className="w-full" onClick={handleVerify}>
            Підтвердити
          </Button>

          {showResend && (
            <Button variant="outline" onClick={resendCode} className="w-full">
              Надіслати код ще раз
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
