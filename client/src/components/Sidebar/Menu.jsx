// Menu.js
import React from 'react';
import { VscMusic } from "react-icons/vsc";
import { RiMap2Line } from "react-icons/ri";
import { PiDownloadSimpleBold } from "react-icons/pi";

import { NavLink } from "react-router-dom";
import SettingsIcon from '../../icons/Settingsicon.tsx';
import ComplaintIcon from '../../icons/ComplaintIcon.tsx';
import UsersIcon from '../../icons/UsersIcon.tsx';
const menu = [
  {
    icon: <RiMap2Line />,
    title: "Kəşf et",
    key: "explore",
    path: "/home/explore"
  },
  {
    icon: <UsersIcon className='#EBEBEB' />,
    title: "Söhbətlər",
    key: "conversations",
    path: "/home/conversations"
  },
  {
    icon: <PiDownloadSimpleBold />,
    title: "Müraciətlər",
    key: "requests",
    path: "/home/requests"
  },
  {
    icon: <VscMusic />,
    title: "Musiqi",
    key: "music",
    path: "/home/music"
  },
  {
    icon: <ComplaintIcon />,
    title: "Bildir",
    key: "complaint",
    path: "/home/complaint"
  },
  {
    icon: <SettingsIcon />,
    title: "Tənzimləmələr",
    key: "settings",
    path: "/home/settings"
  },
];

const Menu = () => {
  return (
    <ul className="text-darkgray dark:text-dark100 flex flex-col gap-2 xs:px-1 lg:w-[215px]">
      {menu.map((item, index) => (
        <NavLink
          key={index}
          to={item.path}
          className={({ isActive }) => `lg:py-[13px] py-2 px-3 rounded-[5px] cursor-pointer ${isActive ? 'dark:bg-navigationdark bg-lightgray text-darkgray dark:text-darkblack' : ''}`}
        >
          <li className="flex items-center gap-2 xs:gap-0">
           <p className='xs:text-xs'> {item.icon}</p>
            <p className="lg:block hidden text-sm lg:text-lg">{item.title}</p>
          </li>
        </NavLink>
      ))
      }
    </ul >
  );
};

export default Menu;
