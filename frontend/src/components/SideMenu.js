import React, { useCallback } from "react";
import { MdOutlineDashboard, MdOutlineCameraAlt, MdOutlineLogout } from "react-icons/md";
import { LuScanLine, LuBarChart3 } from "react-icons/lu";
import { PiSlidersHorizontalBold } from "react-icons/pi";

import "./SideMenu.css";
import { useNavigate } from "react-router-dom";

const detaile = {
  name: "Shewoni",
  role: "Administrator",
  LastExecution: "12 Dec 2023",
};
const SideMenu = ({ status }) => {

  const navigate = useNavigate();
  
  const onDashboard = useCallback(() => {
    navigate("/dashboard");
  }, [navigate]);

  const onScan = useCallback(() => {
    navigate("/scannew");
  }, [navigate]);

  const onAnalytics = useCallback(() => {
    navigate("/analyticsoverview");
  }, [navigate]);

  const onDevice = useCallback(() => {
    navigate("/deviceadd");
  }, [navigate]);

  const onConfiguration = useCallback(() => {
    navigate("/configuration");
  }, [navigate]);

  const onLogout = useCallback(() => {
    navigate("/");
  }, [navigate]);


  return (
    <div className="bordround">
      <div className="row bg_witebox">
        <div className="upboxsetmenu">
          <div className="col-12">
            <div className="row ms-3 me-2 mt-4">
              <span className="navtx01">Welcome back, {detaile.name}</span>
              <div className="ms-2 admin mt-1 mb-1">{detaile.role}</div>
              <span className="navtx02 mt-2 mb-2">Last Execution, {detaile.LastExecution}</span>
            </div>
          </div>
          <div className="col-12 mt-5">
            <div className="row bg_menicon me-3 mb-5">
              <div className="col-12 all_center" onClick={onDashboard}>
                <div className={status === 1 ? "menuicbox active" : "menuicbox"}>
                  <span className="txmen"><MdOutlineDashboard className="me-2 iconmen" /> Dashboard</span>
                </div>
              </div>
              <div className="col-12 all_center"  onClick={onScan}>
                <div className={status === 2 ? "menuicbox active" : "menuicbox"}>
                  <span className="txmen"><LuScanLine className="me-2 iconmen"/> Scan</span>
                </div>
              </div>
              <div className="col-12 all_center" onClick={onAnalytics}>
                <div className={status === 3 ? "menuicbox active" : "menuicbox"}>
                  <span className="txmen"><LuBarChart3 className="me-2 iconmen" /> Analytics</span>
                </div>
              </div>
              <div className="col-12 all_center" onClick={onDevice}>
                <div className={status === 4 ? "menuicbox active" : "menuicbox"}>
                  <span className="txmen"><MdOutlineCameraAlt className="me-2 iconmen" /> Devices</span>
                </div>
              </div>
              <div className="col-12 all_center" onClick={onConfiguration}>
                <div className={status === 5 ? "menuicbox active" : "menuicbox"}>
                  <span className="txmen"><PiSlidersHorizontalBold className="me-2 iconmen" /> Configuration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="dwboxmenu">
          <div className="col-12">
            <div className="row ms-3 me-3 ">
              <div className="btnlogout"  onClick={onLogout}>
                <MdOutlineLogout className="iconmen me-2"/> Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
