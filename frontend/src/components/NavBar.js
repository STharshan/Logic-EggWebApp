import React, { useState, useRef, useEffect } from 'react';
import { MdOutlineNotificationsActive } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { IoLanguageSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

import "./NavBar.css";

const NavBar = ({ title, scan }) => {
  const [scanStatus, setScan] = useState(scan);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notificationsRef = useRef(null);
  const profileRef = useRef(null);

  const toggleNotifications = (event) => {
    event.stopPropagation();
    setShowNotifications(!showNotifications);
    setShowProfile(false);
  };

  const toggleProfile = (event) => {
    event.stopPropagation();
    setShowProfile(!showProfile);
    setShowNotifications(false);
  };

  const closeSections = (event) => {
    // Close only if clicked outside the open boxes
    if (
      (showNotifications && notificationsRef.current && !notificationsRef.current.contains(event.target)) ||
      (showProfile && profileRef.current && !profileRef.current.contains(event.target))
    ) {
      setShowNotifications(false);
      setShowProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', closeSections);
    return () => {
      document.removeEventListener('click', closeSections);
    };
  }, [showNotifications, showProfile]);

  const Notifications = [
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
    { title: 'Scan Started', date: "BAI-LYR-004 • 8:20 AM, 12/30/2023" },
    { title: 'Scan Completed', date: "BAI-LYR-003 • 00:55 AM, 12/29/2023" },
  ];

  const profile = {
    img: "./images/profile.jpg",
    name: "Timothy Samuel",
    role: "Administrator",
    EmployeeId: "BAI-EMP001",
    JoinedDate: "01/06/2023",
  }

  return (
    <div>
      <div className="row mt-4 me-3 mb-1">
        <div className="col-4">
          <span className="txtitle">{title}</span>
        </div>
        <div className="col-8 all_end">
          {scanStatus == "Active" && (
            <div className="witediv ms-1 me-1"><FiPlus className="mt-2 ms-2 me-2 mb-2 iconnav" /> <span className="mt-2  me-2 mb-2 newscantx">New Scan</span> </div>
          )}
          <div className="witediv ms-1 me-1" onClick={(event) => toggleNotifications(event)}><MdOutlineNotificationsActive className="mt-2 ms-2 me-2 mb-2 iconnav" /></div>

          {showNotifications && (
            <div ref={notificationsRef} className="notbox">
              <div className="row mb-3">
                <span className="nttx">Notifications</span>
              </div>
              {Notifications.map(item => (
                <div>
                  <div className="row">
                    <span className="nttx2">{item.title}</span>
                  </div>
                  <div className="row mt-0">
                    <span className="nttx3">{item.date}</span>
                  </div>
                  <div className="row ms-0 me-0 mt-2">
                    <hr className="nttx4" />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="witediv ms-1 me-1"><IoLanguageSharp className="mt-2 ms-2 me-2 mb-2 iconnav" /></div>
          <div className="witediv ms-1 me-1" onClick={(event) => toggleProfile(event)}><LuUser className="mt-2 ms-2 me-2 mb-2 iconnav" /></div>

          {showProfile && (
            <div ref={profileRef} className="profilebox">
              <div className='row darkbg'>
                <span className='prtx'>Profile</span>
              </div>
              <div className='row  porel'>
                <div className='profdark'></div>
                <div className='profligt'></div>
                <div className='all_midprof'>
                  <img className='profimg ' src={profile.img} alt="" />
                </div>
              </div>
              <div className='row'>
                <div className='col-12 all_center mt-2'>
                  <span className='prtx01'>{profile.name}</span>
                </div>
                <div className='col-12 all_center mt-1'>
                  <span className='prtx02'>{profile.role}</span>
                </div>
                <div className='col-12 all_center mt-3'>
                  <span className='prtx03'>Employee ID : {profile.EmployeeId}</span>
                </div>
                <div className='col-12 all_center mb-3'>
                  <span className='prtx03'>Joined Date : {profile.JoinedDate}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default NavBar;
