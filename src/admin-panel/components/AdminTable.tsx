import { ReactNode } from "react";

interface IColumn {
  label: string;
  className?: string;
}

interface AdminTableProps {
    tableHeaders?: IColumn[];
    tableTitle?: string;
    tableColor?: string;
    children?: ReactNode; 
}

export const AdminTable = ({ tableTitle, tableHeaders, tableColor, children }: AdminTableProps) => {
    return (
        <div className={`${tableColor} leading-[130%] `}>
            {tableTitle && <div className="pl-2 text-[24px] pt-3 font-serif">{tableTitle}</div>}
            
            <table className="w-full text-left">
                <thead className="text-[16px]">
                    <tr>
                        {tableHeaders?.map((item, index) => (
                            <th 
                                key={index} 
                                className={`${item.className} font-normal pt-3 `}
                            >   
                                {item.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {children}
                </tbody>
            </table>
        </div>
    );
};