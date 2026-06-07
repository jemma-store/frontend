interface StatCardProps {
  title: string;
  percentage: string | number;
  totalValue: string | number;
}

export const StatCard = ({ title, percentage, totalValue}: StatCardProps) => {
  return (
    <div className="bg-[#A76F53] p-5 flex flex-col gap-5 w-full text-white">
      <div className="flex flex-row justify-between items-center w-full">
        <span className="text-[#F0ECE9] ">{title}</span>
        <span className="text-[16px] px-2 py-1 rounded-lg">
          {percentage}
        </span>
      </div>
      <div className="text-2xl flex font-serif">
        {totalValue}
      </div>
    </div>
  );
};