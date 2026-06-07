export const MenuIcon = ({ classname }: { classname?: string }) => {
  return (
    <svg
      className={classname}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 2H15M1 7.5H15M1 13H15"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
