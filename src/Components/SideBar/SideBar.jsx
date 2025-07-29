import React, { useEffect, useState } from "react";
import {
  FaBaby,
  FaBars,
  FaClipboardList,
  FaLayerGroup,
  FaMoneyCheckAlt,
  FaTh,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

import "./style.css";
import { RxDashboard } from "react-icons/rx";
import { MdMoneyOff } from "react-icons/md";
import axios from "axios";

function SideBar({ children }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const SERVER_URL=import.meta.env.VITE_SERVER_URL

  useEffect(() => {
    const updateOpen = () => {
      if (window.innerWidth < 480) {
        setIsOpen(false);
      } else if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(false);
      }
    };

    updateOpen();
    window.addEventListener("resize", updateOpen);
    return () => window.removeEventListener("resize", updateOpen);
  }, []);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const sideItems = [
    {
      path: "/",
      name: "Dashboard",
      icon: <RxDashboard />,
    },
    {
      path: "/income",
      name: "Income",
      icon: <FaMoneyCheckAlt />,
    },
    {
      path: "/expense",
      name: "Expense",
      icon: <MdMoneyOff />,
    },
  ];

  const handleLogout=async()=>{
     try {
           const response= await axios.post(`${SERVER_URL}/logout`,{},{withCredentials:true})
           console.log(response.data);
           
           if (response.data.success) {
            navigate('/login')
           }
        } catch (error) {
            console.error(error)
        }
  }

  return (
    <div className="sidebar-container">
      <div className="sidebar" style={{ width: isOpen ? "200px" : "60px" }}>
        <div className="top-section">
          {isOpen && <h1 className="logo">Trackit</h1>}
          <div className="bars cursor-p   ">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="menu-items">
          {sideItems.map((item, index) => {
            return (
              <div>
                <NavLink
                  to={item.path}
                  key={index}
                  className={({ isActive }) =>
                    `${isOpen ? "link" : "link justify-content-center"} ${
                      isActive ? "link-active" : ""
                    }`
                  }
                >
                  <div className="link-icon">{item.icon}</div>
                  {isOpen && <div className="link-text">{item.name}</div>}
                </NavLink>
              </div>
            );
          })}
          <div className="logout-section" onClick={handleLogout}>
            {isOpen &&<><FiLogOut className="logout-icon" />
             <p className="logout-name">Logout</p></>}
          </div>
        </div>
      </div>
      <main className="main-content w-100 bg">{children}</main>
    </div>
  );
}

export default SideBar;
