import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { menuItems } from '@/mock/menuItems';
import { UserContacts } from './UserContacts';
import { useAuthStore } from '@/store/useAuthStore';
import { useUserStore } from '@/store';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const Sidebar = () => {

  const navigate = useNavigate();
  const {isMobile} = useWindowWidth();
  const logout = useAuthStore((state) => state.logout);
  const {pathname} = useLocation();
  const clearUser = useUserStore((state) => state.clearUser)

  const linkClass = 'flex gap-5 md:gap-2 p-0 w-full items-center transition-all duration-200';

  const handleLogout = () => {
      console.log("1. Натиснуто кнопку виходу");
      logout();
      clearUser();
      console.log("2. Стор очищено, робимо navigate");
      navigate(AppRoute.ROOT);
  };

  return (
    <aside className="flex flex-col h-[calc(100vh-100px)] md:h-full w-full md:pl-16 md:pt-9">
      <UserContacts />

    {isMobile && (
      <>
        <div className='border-1 border-gray-400 '/>
      </>
    )}
      <nav className="pl-2.5 md:pl-0 py-4 md:py-0 md:mb-[150px]">
      <ul className="flex gap-8 md:gap-6 flex-col p-0 w-fit">
        {menuItems.map((item, index) => {
          return (
            <li key={index} className="w-full font-normal text-[20px] md:text-[16px]">
              <NavLink
                to={item.href}
                end={!item.basePath} 
                className={({ isActive }) => {
                  const isMatch = item.basePath ? pathname.includes(item.basePath) : isActive;
                  return `${linkClass} ${isMatch ? 'md:text-brown-dark font-normal' : 'md:text-grey'}`;
                }}
              >
                {({ isActive }) => {
                  const isMatch = item.basePath ? pathname.includes(item.basePath) : isActive;
                  return (
                    <>
                      <item.icon.type
                        {...item.icon.props}
                        fill={isMatch ? 'var(--brown-dark)' : 'var(--grey)'}
                        stroke={isMatch ? 'var(--brown-dark)' : 'var(--grey)'}
                      />
                      {item.text}
                    </>
                  );
                }}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
     <button
        className="mt-auto self-start pl-6 mb-4 text-[16px] text-[#5B242A] md:pl-0 cursor-pointer"
        onClick={handleLogout}
      >
        Вийти
      </button>
    
    </aside>
  );
};