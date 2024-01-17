import React, { useEffect, useState } from 'react';
import { HiOutlineStopCircle } from "react-icons/hi2";
import { FiPlayCircle } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { LuPauseCircle } from "react-icons/lu";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaRegCircle } from "react-icons/fa";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { LuCircleSlash2 } from "react-icons/lu";
import "./DeviceAdd.css";

import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import StatusAlert from "../components/StatusAlert";
import AlertBox from "../components/AlertBox";
import axios from 'axios';

const DeviceAdd = () => {

  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
  };
  const handleToggle2 = () => {
    setChecked2(!isChecked2);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  
const [devicename, setDevicename] = useState("");
const [deviceId, setDeviceId] = useState("");


const onAddScanner= async () => {
  if (!devicename || !deviceId ) {
    window.alert('Please fill the field');
    return;
  }

  try{
    await axios.post('http://localhost:5000/api/device', {
      devicename,
      deviceId
    })
    window.alert('Device saved successfully');
  } catch (error) {
    console.error('Error saving device:', error);
    window.alert('Error saving device');
  }
  
}

const [data, setData] = useState('');

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/get/device");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  fetchData();
}, []);


  const runtable = [
    {
      DeviceName: "BAI-Scanner-01",
      DeviceID: "0819-5292-8398-9574-3807",
      Status: "Active",
    },
    {
      DeviceName: "BAI-Scanner-01",
      DeviceID: "0819-5292-8398-9574-3807",
      Status: "Busy",
    },
    {
      DeviceName: "BAI-Scanner-01",
      DeviceID: "0819-5292-8398-9574-3807",
      Status: "Inactive",
    },
  ];

  return (
    <div>
      <div className="row bg_def">
        <div className="menubox">
          <SideMenu status={4} /> {/* set active menu (1-Dashboard / 2-Scan / 3-Analytics ...)*/}
        </div>
        <div className="contentbox">
          <div className='col-12'>
            <div className='row conboxup'>
              <NavBar title={"Devices"} scan={"Active"} /> {/* title={"text"} scan={"Active or DeActive"}*/}
            </div>
            <div className='row conboxdw'>
              <div className='col-12'>

                <div className='row me-3'>
                  <div className='col-12'>
                    <div className="tab-container">
                      <div
                        className={activeTab === 1 ? 'tabtx tabActive' : 'tabtx'}
                        onClick={() => handleTabClick(1)}
                      >
                        Add Device
                      </div>
                      <div
                        className={activeTab === 2 ? 'tabtx tabActive' : 'tabtx'}
                        onClick={() => handleTabClick(2)}
                      >
                        Monitor
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2'>
                    <div className="details-box">
                      {activeTab === 1 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-12 col-md-6'>
                              <div className='inputnew mb-3'>
                                <div className='col-12'>
                                  <label>Device Name*</label>
                                </div>
                                <div className='col-12'>
                                  <input className='inputde' type="text" placeholder='Enter device name' onChange={(e) => {setDevicename(e.target.value)}}/>
                                </div>
                              </div>
                            </div>
                            <div className='col-12 col-md-6'>
                              <div className='inputnew mb-3'>
                                <div className='col-12'>
                                  <label>Device ID*</label >
                                </div>
                                <div className='col-12 all_start'>
                                  <select name="" id="" onChange={(e) => {setDeviceId(e.target.value)}}>
                                    <option value="0">Select available device ID</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                  <div className='nesbut3 all_center ms-3 ' onClick={onAddScanner}>Add Scanner</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {activeTab === 2 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-12'>
                              <div className='row ms-0 me-0'>
                                <input type="text" className='idinput' placeholder='Search execution history by ID or Initiator' />
                                <div className='idstatus ms-2'><CiCirclePlus className="me-2 iconnav" />Status</div>
                              </div>
                            </div>
                            <div className='col-12 mt-2'>
                              <table className='table newtable'>
                                <thead>
                                  <tr>
                                    <th>Device Name</th>
                                    <th>Device ID</th>
                                    <th>Status</th>
                                    <th className='all_endegg'>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((item) => (
                                    <tr>
                                      <td>{item.devicename}</td>
                                      <td>{item.deviceId}</td>
                                      <td>
                                        {
                                          item.Status === 'Active' ? (
                                            <div>
                                              <FaRegCircle  className="me-2 iconnav3" />
                                              <samp>Active</samp>
                                            </div>
                                          ) : item.Status === 'Busy' ? (
                                            <div>
                                              <IoEllipsisHorizontalCircle  className="me-2 iconnav2" />
                                              <samp>Busy</samp>
                                            </div>
                                          ) : item.Status === 'Inactive' ? (
                                            <div>
                                              <LuCircleSlash2  className="me-2 iconnav3" />
                                              <samp>Inactive</samp>
                                            </div>
                                          ) : null // Provide a default case or use null if necessary
                                        }
                                      </td>
                                      <td className='all_endegg'>
                                      <IoMdCloseCircleOutline  className="me-2 iconnav1" />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className='col-12 mt-0'>
                              <div className='row'>
                                <div className='col-6 all_start rowscount'>
                                  <span>Rows per page</span>
                                  <select name="" id="">
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="30">30</option>
                                  </select>
                                </div>
                                <div className='col-6 all_end'>
                                  <span className='pagetx me-4'>Page 1 of 2</span>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdOutlineKeyboardDoubleArrowLeft className="me-2 arorboxicon" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardArrowLeft className="me-2 arorboxicon" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardArrowRight className="me-2 arorboxicon2" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardDoubleArrowRight className="me-2 arorboxicon2" />
                                  </div>

                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <AlertBox title={"Remove scanner from devices?"} descripton={"This action cannot be undone and will permanently remove scanner BAI-LYR-001 from the system. To add the same device, navigate to the Add Device tab under the Devices page."} button01={"Cancel"} button02={"Remove"}/> */}

      <StatusAlert title={"Scan Started"} description={"Initiated scan BAI-LYR-001 and is now running. "} /> {/*title={"text"} description={"text"}*/}
    </div>
  );
};

export default DeviceAdd;
