interface OrderCardProps {
    title: string;
    children: React.ReactNode;
}

export const OrderCard = ({ title, children}: OrderCardProps) => {
  return (
    <div className="bg-[#A76F53] p-4 flex flex-col gap-5 w-full text-white min-h-[188px] rounded-xl">
        <span className="text-[#F0ECE9] text-[20px]">{title}</span>
        {children}
    </div>
  );
};