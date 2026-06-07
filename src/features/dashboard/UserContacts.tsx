import { UserIcon } from '@/assets';
import { useUserStore } from '@/store/useUserStore';

export const UserContacts = () => {
  const user = useUserStore((state) => state.currentUser);

  return (
    <div className="text-[20px] flex items-center gap-5 md:gap-3 pl-2 md:pl-0 w-full mb-5 md:mb-8 leading-[130%]">
      <UserIcon classname="text-[#5B242A]" />

      <div className="flex flex-col items-start justify-center gap-3 ">
        <div className="text-[#5B242A] font-medium ">
          {user?.firstName} {user?.lastName}
        </div>

        <div className="text-[16px] text-[#727272]">{user?.phone}</div>
      </div> 
    </div>
  );
};