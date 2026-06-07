import { NavLink } from "react-router-dom";

import { ChevronRight } from "@/assets";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export const BreadCrumbs = ({items}: {items: BreadcrumbItem[]}) => {
  return (
    <nav className="flex w-[250px] md:flex md:w-max">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          {i > 0 && <ChevronRight classname="opacity-40"/>}
          {item.href ? (
          <NavLink 
              to={item.href} 
              end
              className={({ isActive }) => 
                `cursor-pointer transition-colors duration-300 hover:text-black ${
                  isActive ? "text-black" : "text-[#727272] opacity-80"
                }`
              }
            >
                <div>{item.label}</div>
            </NavLink>
          ) : (
            <span className="text-brown-dark">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  )
}