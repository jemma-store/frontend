import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';

import { Logo } from '@/assets';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '@/enums';

const text = 'РЕЄСТРАЦІЯ';

export const SuccessfulRegister = () => {
  const navigate = useNavigate();
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [hideFirst, setHideFirst] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowCongratulations(true), 3000);
    const hideTimer = setTimeout(() => setHideFirst(true), 4000);
    const redirectTimer = setTimeout(() => navigate(AppRoute.ROOT), 10000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      {showCongratulations && (
        <div className="absolute inset-0 pointer-events-none -z-1">
          <Confetti />
        </div>
      )}

      <h1 className="w-full flex items-center justify-center text-center uppercase text-[var(--button)]">
        {!hideFirst && (
          <p className="flex items-center gap-5">
            <span className="flex gap-1">
              {text.split('').map((letter, i) => (
                <span
                  key={i}
                  className={`letter ${showCongratulations ? 'fade-out' : ''}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {letter}
                </span>
              ))}
            </span>{' '}
            <span>УСПІШНА</span>
          </p>
        )}

        {hideFirst && (
          <span className="flex items-center gap-4 animate-fade-in">
            вітаємо в
            <Logo width={'250'} height={'65'} classname="text-[var(--accent)]" />
          </span>
        )}
      </h1>
    </div>
  );
};
