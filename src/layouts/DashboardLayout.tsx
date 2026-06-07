import { Outlet } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

import { Sidebar } from '@/features/dashboard/Sidebar';
import { ArrowLeft } from '@/assets/icons/ArrowLeft';


export const DashboardLayout = () => {

  const location = useLocation()
  const isMenuPage = location.pathname === '/dashboard';
  const navigate = useNavigate()

  const {isDesktop, isTablet} = useWindowWidth();

  return (
    <>
      {isDesktop || isTablet ? (
        <div className="flex w-full whitespace-nowrap gap-10 lg:gap-15 xl:gap-30 ">
          <nav className='h-full'>
            <Sidebar />
          </nav>
          <main className='lg:w-full'>
            <Outlet />
          </main>
        </div>
      ) : (
        <>
        {isMenuPage ?
        (<Sidebar />) : 
        (
          <div>
              <button
                onClick={() => navigate(-1)}
                className='pl-4 flex items-center leading-none gap-1 text-[16px] font-medium'>
                  <ArrowLeft />
                <span>Назад</span>
              </button>
            <Outlet />
          </div>
        )
        }
        </>
      )}
    </>
  );
};
