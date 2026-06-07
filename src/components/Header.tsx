import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Marquee from 'react-fast-marquee';
import cn from 'classnames';

import { Logo } from '@/assets';
import { AppRoute } from '@/enums';
import { navItems } from '@/mock';
import { headerButtons, headerButtonsMobile } from '@/mock/headerButtons';
import { SearchDropdown } from './SearchDropdown';
import { SupportDrawer } from './SupportDrawer';
import { BurgerMenu } from './BurgerMenu';
import { setQueryParams } from '@/utils/urlParams';
import { useCatalogStore, useProductStore, useUserStore, useModalStore } from '@/store';
import { useSmartCart } from '@/lib/hooks/useSmartCart';

interface IHeaderButton {
  title: string;
  href: string;
  activePath?: string[]; 
}

const Header = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const { pathname } = useLocation();

  const { cartTotalQuantity } = useSmartCart();
  const favoriteCount = useProductStore((state) => state.favorites.length);
  const user = useUserStore((state) => state.currentUser);
  const {currentUser} = useUserStore()
  const isAdmine = currentUser?.role === "ADMIN";
  
  const { page, sortBy, priceRange } = useCatalogStore();
  
  const promoMessage = "Безкоштовна доставка кур'єром Нової Пошти!";

  const toggleActiveButton = (title: string) => {
    const isAuthPage = pathname === AppRoute.SIGN_IN || pathname === AppRoute.SIGN_UP;

    if (isAuthPage && (title === 'scale' || title === 'favorite')) return;

    if (activeButton === title) {
      setActiveButton(null);
    } else {
      setActiveButton(title);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem('activeButton');
    if (stored) {
      setActiveButton(stored);
    }
  }, []);

  useEffect(() => {
    const matched = (headerButtons as IHeaderButton[]).find((item) => 
      item.activePath?.includes(pathname) || item.href === pathname
    );

    if (matched) {
      setActiveButton(matched.title);
      localStorage.setItem('activeButton', matched.title);
    } else {
      setActiveButton(null);
      localStorage.removeItem('activeButton');
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.innerWidth >= 768 ? 400 : 100;

      setScrolled(window.scrollY > scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, el: string) => {
    e.preventDefault();

    const target = document.querySelector(el);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="w-full fixed z-50">
      {isAdmine ? (
        <header className='py-2.5 px-15 flex flex-row items-center justify-between bg-black'>
          <div>
            <Link
              id="header-logo"
              to={AppRoute.ROOT}
              className="lg:w-[105px] lg:h-[30px] cursor-pointer w-[70px] h-[20px]"
            >
              <Logo
                width={'105'}
                height={'30'}
                classname="lg:w-[105px] lg:h-[30px] text-accent w-[70px] h-[20px]"
              />
            </Link>
          </div>
            <div className='flex flex-row items-center gap-8'>
              {headerButtons.map((item) => {
                const isActive = activeButton === item.title || pathname === item.href;

                const iconColor = isActive ? 'accent' : 'main';
                const Icon = item.icon;

              if (item.title === 'search') {
                return (
                  <button
                    className="btn"
                    onClick={() => {
                      setSearchOpen(!searchOpen);
                      toggleActiveButton('search');
                    }}
                    key={item.title}
                  >
                    <Icon classname={`text-${iconColor} w-5 h-5` } />
                  </button>
                );
              }
              if(item.title === "admin") {
                return (
                  <Link to={AppRoute.ADMIN_DASHBOARD}>
                    <button className='text-white btn'>
                      <Icon classname={`text-${iconColor} w-6 h-6` } />
                    </button>
                  </Link>
                )
              } 
            })}
               <SearchDropdown
                  isOpen={searchOpen}
                  onClose={() => {
                    setSearchOpen(false);
                    toggleActiveButton('search');
                  }}
                />
          </div>
        </header>
      ) : (
        <header>
           <Marquee className="lg:h-[50px] bg-main h-[40px]">
            {[...Array(10)].map((_, index) => (
              <span
                key={index}
                className="lg:text-second text-[12px] lg:font-medium font-light pr-8 lg:pr-[248px]"
              >
                {promoMessage}
              </span>
            ))}
          </Marquee>

          <div
            className={cn(
              'w-full lg:h-[50px] lg:p-0 py-[10px] transition-colors duration-300',
              pathname === AppRoute.ROOT || pathname === AppRoute.PRODUCTS
                ? scrolled
                  ? 'bg-brown-dark'
                  : 'bg-transparent'
                : 'bg-brown-dark',
            )}
          >
          <div className="container flex items-center justify-between h-full">
            <Link
              id="header-logo"
              to={AppRoute.ROOT}
              className="lg:w-[105px] lg:h-[30px] cursor-pointer w-[70px] h-[20px]"
            >
              <Logo
                width={'105'}
                height={'30'}
                classname="lg:w-[105px] lg:h-[30px] text-accent w-[70px] h-[20px]"
              />
            </Link>

            <nav className="lg:hidden flex gap-10 items-center justify-between">
              {headerButtonsMobile.map((item) => {
                const isActive = activeButton === item.title || pathname === item.href;

                const iconColor = isActive ? 'accent' : 'main';
                const Icon = item.icon;

                if (item.title === 'search') {
                  return (
                    <button
                      className="btn"
                      onClick={() => {
                        setSearchOpen(!searchOpen);
                        toggleActiveButton('search');
                      }}
                      key={item.title}
                    >
                      <Icon classname={`text-${iconColor}`} />
                    </button>
                  );
                }

                if (item.title === 'shoppingBag') {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        useModalStore.getState().open('cart');
                      }}
                      key={item.title}
                      className="btn relative"
                    >
                      <Icon classname={`text-${iconColor}`} />
                      {cartTotalQuantity > 0 && (
                        <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-accent text-main rounded-full w-3 h-3 flex items-center justify-center">
                          {cartTotalQuantity}
                        </span>
                      )}
                    </button>
                  );
                }

                if (item.title === 'menuIcon') {
                  return (
                    <BurgerMenu
                      key={item.title}
                      activeButton={activeButton}
                      setActiveButton={toggleActiveButton}
                    />
                  );
                }
              })}
            </nav>

            <div className="lg:flex lg:items-center lg:gap-[196px] h-full hidden">
              <nav className="flex gap-10 sm:hidden xl:flex items-center text-main">
                {navItems
                  .filter((item) => {
                    if (item.href === '#about-us' && pathname !== AppRoute.ROOT) {
                      return false;
                    }
                    return true;
                  })
                  .map((item, index) =>
                    item.href.startsWith('#') ? (
                      <a
                        key={index}
                        href={item.href}
                        onClick={(e) =>
                          handleScrollClick(e as React.MouseEvent<HTMLAnchorElement>, item.href)
                        }
                        className={cn(
                          'flex w-[88px] justify-center px-0 pb-[5px] py-2 border border-solid border-transparent items-center hover:border-b-main active:text-accent',
                        )}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        key={index}
                        to={
                          item.label === 'Каталог'
                            ? `${AppRoute.PRODUCTS}${setQueryParams({
                                page,
                                sortBy: sortBy,
                                minPrice: priceRange[0],
                                maxPrice: priceRange[1],
                              })}`
                            : item.label === 'Новинки'
                              ? `${AppRoute.PRODUCTS}${setQueryParams({
                                  page: 1,
                                  sortBy: sortBy,
                                  minPrice: priceRange[0],
                                  maxPrice: priceRange[1],
                                  isNew: true,
                                })}`
                              : item.href
                        }
                        className={cn(
                          'flex w-[88px] justify-center px-0 pb-[5px] py-2 border border-solid border-transparent items-center hover:border-b-main active:text-accent',
                        )}
                      >
                        <span className="whitespace-nowrap">{item.label}</span>
                      </Link>
                    ),
                  )}
              </nav>

              <div className="flex items-center justify-center gap-8">
                {headerButtons.map((item) => {
                  const isActive = activeButton === item.title || pathname === item.href;

                  const iconColor = isActive ? 'accent' : 'main';
                  const Icon = item.icon;

                  if (item.title === 'search') {
                    return (
                      <button
                        className="btn"
                        onClick={() => {
                          setSearchOpen(!searchOpen);
                          toggleActiveButton('search');
                        }}
                        key={item.title}
                      >
                        <Icon classname={`text-${iconColor}`} />
                      </button>
                    );
                  }

                  if (item.title === 'shoppingBag') {
                    return (
                      <button
                        onClick={() => {
                          useModalStore.getState().open('cart');
                        }}
                        key={item.title}
                        className="btn relative"
                        type="button"
                      >
                        <Icon classname={`text-${iconColor}`} />
                        {cartTotalQuantity > 0 && (
                          <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-accent text-main rounded-full w-3 h-3 flex items-center justify-center">
                            {cartTotalQuantity}
                          </span>
                        )}
                      </button>
                    );
                  }

                  if (item.title === 'user') {
                    return user ? (
                      <Link
                        key={item.title}
                        to={AppRoute.USER_DATA}
                        onClick={() => setActiveButton(item.title)}
                        className={cn('btn relative flex items-center text-white', isActive ? 'text-accent' 
                          : "text-white"
                        )}
                      >
                        <span className={cn(isActive ? 'text-accent text-2xl' : "text-white font-light text-2xl" )} >{user.firstName[0]}</span>
                      </Link>
                    ) : (
                      <Link
                        key={item.title}
                        to={AppRoute.SIGN_IN}
                        onClick={() => setActiveButton(item.title)}
                        className={cn('btn relative flex items-center', isActive ? 'text-accent' : 'text-white')}
                      >
                        <Icon classname={`text-${iconColor}`} />
                      </Link>
                    );
                  }

                  if (item.title === 'scale') {
                    return (
                      <Link
                        key={item.title}
                        to={user ? AppRoute.USER_SCALES : AppRoute.SIGN_IN}
                        onClick={() => setActiveButton(item.title)}
                        className={cn('btn relative flex items-center', isActive ? 'text-accent' : 'text-white')}
                      >
                          <Icon classname={`text-${iconColor}`} />
                      </Link>
                    );
                  }

                  if (item.title === 'favorite') {
                    return (
                      <Link
                        key={item.title}
                        to={user ? AppRoute.USER_FAVORITES : AppRoute.SIGN_IN}
                        onClick={() => setActiveButton(item.title)}
                        className={cn('btn relative', isActive? 'text-accent' : "text-white")}
                      >
                        <Icon classname={`text-${iconColor}`} />

                        {favoriteCount > 0 && (
                          <span className="absolute -top-1 -right-1 text-medium text-[10px] bg-accent text-main rounded-full w-3 h-3 flex items-center justify-center">
                            {favoriteCount}
                          </span>
                        )}
                      </Link>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>

        <SupportDrawer />

        <SearchDropdown
          isOpen={searchOpen}
          onClose={() => {
            setSearchOpen(false);
            toggleActiveButton('search');
          }}
        />
      </header>
    )}
     
    </header>
  );
};

export default Header;