// import React from "react";
// import { NavLink } from "react-router-dom";
// import { Plane, Ticket, Tag, CircleHelp, Bell, UserCircle } from "lucide-react";

// const Head = () => {
//   const navItems = [
//     { name: "Book Flight", path: "/Booking", icon: Plane },
//     { name: "Manage Booking", path: "/ManageBooking", icon: Ticket },
//     { name: "Offers", path: "/offers", icon: Tag },
//     { name: "Help", path: "/help", icon: CircleHelp },
//   ];

//   return (
//     <header className="relative z-50 w-full overflow-hidden border-b border-gray-200 bg-white">
//       {/* Decorative Background */}
//       <div className="pointer-events-none absolute inset-y-0 right-0 w-[26%] bg-sky-300">
//         <div className="absolute -left-12 top-0 h-full w-24 -skew-x-[35deg] bg-red-600" />
//       </div>

//       <nav className="relative z-10 mx-auto grid h-[95px] w-full grid-cols-[1fr_auto_1fr] items-center px-6 lg:px-16 xl:px-24">
//         {/* Logo */}
//         <NavLink to="/" className="flex w-fit items-center gap-2">
//           <Plane
//             size={39}
//             strokeWidth={2.5}
//             className="rotate-[-25deg] text-red-600"
//           />

//           <span className="text-3xl font-extrabold tracking-tight text-blue-950">
//             Fly<span className="text-red-600">Me</span>
//           </span>
//         </NavLink>

//         {/* Navigation Links */}
//         <div className="hidden items-center justify-center gap-7 lg:flex xl:gap-12">
//           {navItems.map(({ name, path, icon: Icon }) => (
//             <NavLink
//               key={path}
//               to={path}
//               className={({ isActive }) =>
//                 `flex items-center gap-2 whitespace-nowrap text-[16px] font-semibold transition-all duration-200 ${
//                   isActive
//                     ? "text-red-600"
//                     : "text-slate-800 hover:text-red-600"
//                 }`
//               }
//             >
//               <Icon size={22} strokeWidth={2} />
//               {name}
//             </NavLink>
//           ))}
//         </div>

//         {/* Right Actions */}
//         <div className="flex items-center justify-end gap-7 text-blue-950">
//           <button
//             type="button"
//             aria-label="Notifications"
//             className="transition hover:scale-110 hover:text-red-600"
//           >
//             <Bell size={27} strokeWidth={2} />
//           </button>

//           <NavLink
//             to="/profile"
//             aria-label="Profile"
//             className={({ isActive }) =>
//               `transition hover:scale-110 ${
//                 isActive ? "text-red-600" : "text-blue-950 hover:text-red-600"
//               }`
//             }
//           >
//             <UserCircle size={32} strokeWidth={2} />
//           </NavLink>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Head;

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Plane, Ticket, CircleHelp, Bell, Menu, X } from "lucide-react";

const Head = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Book Flight", path: "/Booking", icon: Plane },
    { name: "Manage Booking", path: "/ManageBooking", icon: Ticket },
    { name: "Help", path: "/help", icon: CircleHelp },
  ];

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 ${
      isActive ? "text-red-600" : "text-slate-800 hover:text-red-600"
    }`;

  return (
    <header className="relative z-50 w-full border-b border-gray-200 bg-white">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[26%] bg-sky-300 sm:block">
        <div className="absolute -left-12 top-0 h-full w-24 -skew-x-[35deg] bg-red-600" />
      </div>

      <nav className="relative z-10 mx-auto flex h-[75px] w-full items-center justify-between px-4 sm:h-[85px] sm:px-6 lg:h-[95px] lg:px-12 xl:px-20">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          className="flex shrink-0 items-center gap-2"
        >
          <Plane
            size={34}
            strokeWidth={2.5}
            className="rotate-[-25deg] text-red-600 sm:size-9"
          />

          <span className="text-2xl font-extrabold tracking-tight text-blue-950 sm:text-3xl">
            Fly<span className="text-red-600">Me</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center justify-center gap-5 lg:flex xl:gap-10">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink key={path} to={path} className={linkStyle}>
              <Icon size={21} strokeWidth={2} />
              <span className="text-sm xl:text-base">{name}</span>
            </NavLink>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex shrink-0 items-center gap-3 text-blue-950 sm:gap-5">
          <button
            type="button"
            aria-label="Notifications"
            className="transition hover:scale-110 hover:text-red-600"
          >
            <Bell size={24} strokeWidth={2} />
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            className="ml-1 text-blue-950 transition hover:text-red-600 lg:hidden"
          >
            {menuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`absolute left-0 top-full z-50 w-full border-b border-gray-200 bg-white shadow-lg transition-all duration-300 lg:hidden ${
          menuOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 pointer-events-none opacity-0"
        }`}
      >
        <div className="flex flex-col px-5 py-3">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-4 border-b border-gray-100 px-3 py-4 text-[15px] font-semibold transition ${
                  isActive
                    ? "bg-red-50 text-red-600"
                    : "text-slate-800 hover:bg-gray-50 hover:text-red-600"
                }`
              }
            >
              <Icon size={21} />
              {name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Head;
