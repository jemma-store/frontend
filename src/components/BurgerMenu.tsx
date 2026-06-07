import { FC, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import { MenuIcon, X } from '@/assets';
import { categories, footerLinks, socialLinks } from '@/mock';
import { burgerButtons } from '@/mock/headerButtons';
import { useUserStore } from '@/store/useUserStore';
import { useProductStore } from '@/store/useProductStore';
import { useBurgerStore } from '@/store/useBurgerStore';
import { Drawer, DrawerContent, DrawerTrigger } from './ui';

type BurgerMenuProps = {
  activeButton: string | null;
  setActiveButton: (title: string) => void;
};

export const BurgerMenu: FC<BurgerMenuProps> = ({ activeButton, setActiveButton }) => {
  const { pathname } = useLocation();
  const [isHovering, setIsHovering] = useState(false);
  const user = useUserStore((state) => state.currentUser);
  const favoriteCount = useProductStore((state) => state.favorites.length);
  const isOpen = useBurgerStore((state) => state.isOpen);
  const closeMenu = useBurgerStore((state) => state.closeMenu);
  const toggleMenu = useBurgerStore((state) => state.toggleMenu);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  return (
    <div className="flex align-center gap-1">
      <Drawer open={isOpen} onOpenChange={(open) => !open && closeMenu()} direction="right">
        <DrawerTrigger asChild>
          <button
            className="btn"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={toggleMenu}
          >
            <MenuIcon classname={isHovering ? 'text-accent' : 'text-main'} />
          </button>
        </DrawerTrigger>

        <DrawerContent className="bg-brown-dark text-main px-6 py-8 fixed lg:bottom-15 lg:right-15 top-10 right-0 z-1000 w-[290px] min-h-screen lg:rounded-[6px] lg:shadow-xl rounded-none shadow-none flex flex-col justify-between ::after-none">
          <div className="flex flex-col items-end gap-7 overflow-y-auto max-h-[calc(100dvh-3rem)] pr-1">
            <div className="flex items-center gap-13">
              {burgerButtons.map((button) => {
                const isActive = activeButton === button.title || pathname === button.href;

                const iconColor = isActive ? 'accent' : 'main';
                const Icon = button.icon;

                if (button.title === 'user') {
                  return user ? (
                    <Link
                      key={button.title}
                      to={AppRoute.USER_DATA}
                      onClick={() => setActiveButton(button.title)}
                      className={cn('btn relative flex items-center', isActive && 'text-accent')}
                    >
                      <span className="text-text font-[500]">{user.firstName[0]}</span>
                    </Link>
                  ) : (
                    <Link
                      key={button.title}
                      to={AppRoute.SIGN_IN}
                      onClick={() => setActiveButton(button.title)}
                      className={cn('btn relative', isActive && 'text-accent')}
                    >
                      <Icon classname={`text-${iconColor}`} />
                    </Link>
                  );
                }

                if (button.title === 'scale') {
                  return (
                    <Link
                      key={button.title}
                      to={user ? AppRoute.USER_SCALES : AppRoute.SIGN_IN}
                      onClick={() => setActiveButton(button.title)}
                      className={cn('btn relative flex items-center', isActive && 'text-accent')}
                    >
                      <span className="text-text font-[500]">
                        <Icon classname={`text-${iconColor}`} />
                      </span>
                    </Link>
                  );
                }

                if (button.title === 'favorite') {
                  return (
                    <Link
                      key={button.title}
                      to={user ? AppRoute.USER_FAVORITES : AppRoute.SIGN_IN}
                      onClick={() => setActiveButton(button.title)}
                      className={cn('btn relative', isActive && 'text-accent')}
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

              <div className="flex justify-end">
                <button className="btn" onClick={closeMenu}>
                  <X classname="text-main w-6 h-6" />
                </button>
              </div>
            </div>

            <ul className="flex flex-col gap-1">
              {categories.map((category) => (
                <li key={category.id} className="py-3">
                  <Link to="#" className="hover:text-accent transition-colors">
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-1 items-end">
              {footerLinks.map((link, index) => (
                <li key={index} className="py-3">
                  <Link to={link.href} className="hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="flex flex-col gap-1">
              {socialLinks.map((link, index) => (
                <li key={index} className="py-3">
                  <a href="#" className="hover:text-accent transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};
