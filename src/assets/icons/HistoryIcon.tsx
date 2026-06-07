export const HistoryIcon = ({ stroke }: { stroke?: string }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.15154 19.071C7.78759 20.7071 9.94035 21.7252 12.243 21.9519C14.5456 22.1786 16.8555 21.5997 18.7792 20.3141C20.7029 19.0285 22.1212 17.1155 22.7925 14.9013C23.4638 12.6871 23.3465 10.3086 22.4606 8.17119C21.5747 6.03376 19.975 4.26967 17.9342 3.17953C15.8934 2.08939 13.5377 1.74067 11.2685 2.1928C8.99941 2.64492 6.95727 3.86992 5.49013 5.65902C4.02299 7.44812 3.22165 9.69062 3.22266 12.0044V14.2221"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 11.9999L3.22222 14.2221L5.44444 11.9999M12.1111 7.55548V13.111H17.6666"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
