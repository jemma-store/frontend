import { FC, RefObject } from 'react';

interface CustomNavigationProps {
  prevRef: RefObject<null | HTMLDivElement>;
  nextRef: RefObject<null | HTMLDivElement>;
}

export const CustomNavigation: FC<CustomNavigationProps> = ({ prevRef, nextRef }) => {
  return (
    <div className="absolute top-1/2 w-full flex justify-between px-0 z-50 pointer-events-none">
      <div ref={prevRef} className="cursor-pointer pointer-events-auto">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="16.9707"
            y="33.9409"
            width="24"
            height="2"
            transform="rotate(-135 16.9707 33.9409)"
            fill="#1D110A"
          />
          <rect
            x="18.3848"
            y="1.41406"
            width="24"
            height="2"
            transform="rotate(135 18.3848 1.41406)"
            fill="#1D110A"
          />
        </svg>
      </div>

      <div ref={nextRef} className="cursor-pointer pointer-events-auto">
        <svg
          width="34"
          height="34"
          viewBox="0 0 34 34"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect x="16.9727" width="24" height="2" transform="rotate(45 16.9727 0)" fill="#1D110A" />
          <rect
            x="15.5586"
            y="32.5269"
            width="24"
            height="2"
            transform="rotate(-45 15.5586 32.5269)"
            fill="#1D110A"
          />
        </svg>
      </div>
    </div>
  );
};
