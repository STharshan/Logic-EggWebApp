import React, { useCallback, useEffect, useState } from 'react';
import { HiOutlineStopCircle } from "react-icons/hi2";
import { FiPlayCircle } from "react-icons/fi";
import { CiCirclePlus } from "react-icons/ci";
import { LuPauseCircle } from "react-icons/lu";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { LuEye } from "react-icons/lu";
import "./ScanNew.css";

import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import StatusAlert from "../components/StatusAlert";
// import AlertBox from "../components/AlertBox";
// import ScanVideoPopUp from "../components/ScanVideoPopUp";
import axios from 'axios';

const ScanNew = () => {

  const [scanId, setScanId] = useState("");
  const [eggType, setEggType] = useState("0");
  const [isChecked, setIsChecked] = useState(false);
  const [duration, setDuration] = useState("0");
  const [device, setDevice] = useState("0");
  const [isChecked2, setIsChecked2] = useState(false);
  const [scheduledDate, setScheduledDate] = useState("0");
  const [scheduledTime, setScheduledTime] = useState("0");
  const [errorMessage, setErrorMessage] = useState("");


  const handleToggle = () => {
    setIsChecked(!isChecked);
  };
  const handleToggle2 = () => {
    setIsChecked2(!isChecked2);
  };

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleClear = () => {
    setScanId("");
    setEggType("0");
    setDevice("0");
    setDuration("0");
    setIsChecked(false);
    setIsChecked2(false);
    setScheduledDate("0");
    setScheduledTime("0");
    setErrorMessage("");
  };

  const handleStartScan = async () => {
    if (!scanId || eggType === "0" || (isChecked && duration === "0") || device === "0" || (isChecked2 && scheduledDate === "0") || (isChecked2 && scheduledTime === "0")) {
      window.alert("Please fill in all required fields")
      setErrorMessage("Please fill in all required fields");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/scans", {
        scanId,
        eggType,
        automaticTermination: isChecked,
        duration,
        device,
        scheduledExecution: isChecked2,
        scheduledDate,
        scheduledTime,
      });

      console.log("Scan details saved successfully");
      window.alert("Scan details saved successfully")
    } catch (error) {
      console.error("Error saving scan details:", error.response?.data?.message);
      window.alert("Error saving scan details")
    }
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/data");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

    const handleDelete = async (id) => {
      try {
        await axios.delete('http://localhost:5000/api/delete/'+id);
        console.log('Item deleted successfully');
        window.alert('Item deleted successfully')
        // Update your state or perform any necessary actions
      } catch (error) {
        console.error('Error deleting item', error);
        window.alert('Error deleting item');
      }
    };

  const runtable = [
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "play",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "pluse",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "play",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "pluse",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "play",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      DateTime: "12/20/2023 - 10:17 PM",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
      Actions: "pluse",
    },
    
  ];

  return (
    <div>
      <div className="row bg_def">
        <div className="menubox">
          <SideMenu status={2} /> {/* set active menu (1-Dashboard / 2-Scan / 3-Analytics ...)*/}
        </div>
        <div className="contentbox">
          <div className='col-12'>
            <div className='row conboxup'>
              {activeTab === 1 && (
                <NavBar title={"Scan"} scan={"DeActive"} /> /* title={"text"} scan={"Active or DeActive"}*/
              )}
              {activeTab === 2 && (
                <NavBar title={"Scan"} scan={"Active"} /> /* title={"text"} scan={"Active or DeActive"}*/
              )}
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
                        New
                      </div>
                      <div
                        className={activeTab === 2 ? 'tabtx tabActive' : 'tabtx'}
                        onClick={() => handleTabClick(2)}
                      >
                        Running
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
                                  <label>Scan ID</label>
                                </div>
                                <div className='col-12'>
                                  <input type="text" placeholder='BAI-LYR-001' onChange={(e) => {setScanId(e.target.value)}}/>
                                </div>
                              </div>
                              <div className='inputnew mb-3'>
                                <div className='col-12'>
                                  <label>Egg Type*</label>
                                </div>
                                <div className='col-12'>
                                  <select name="" id="" onChange={(e) => {setEggType(e.target.value)}}>
                                    <option value="0">Select egg type</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                </div>
                              </div>
                              <div className='inputnew mb-3'>
                                <div className='col-12 all_leftlab mb-1'>
                                  <label className='me-5'>Automatic Termination*</label>
                                  <div className={`ms-2 switch-container ${isChecked ? 'on' : 'off'}`} onClick={handleToggle}>
                                    <div className="slider"></div>
                                  </div>
                                </div>
                                <div className='col-12'>
                                  <select name="" id="" className='harfselect' onChange={(e) => {setDuration(e.target.value)}}>
                                    <option value="0">Select duration</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className='col-12 col-md-6'>
                              <div className='inputnew mb-3'>
                                <div className='col-12'>
                                  <label>Device*</label>
                                </div>
                                <div className='col-12'>
                                  <select name="" id="" onChange={(e) => {setDevice(e.target.value)}}>
                                    <option value="0">Select available device(s)</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                </div>
                              </div>
                              <div className='inputnew mb-3'>
                                <div className='col-12 all_leftlab mb-1'>
                                  <label className='me-5'>Scheduled Execution*</label>
                                  <div className={`ms-2 switch-container ${isChecked2 ? 'on' : 'off'}`} onClick={handleToggle2}>
                                    <div className="slider"></div>
                                  </div>
                                </div>
                                <div className='col-12'>
                                  <select name="" id="" className='harfselect1' onChange={(e) => {setScheduledDate(e.target.value)}}>
                                    <option value="0">Select date</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                  <select name="" id="" className='harfselect2' onChange={(e) => {setScheduledTime(e.target.value)}}>
                                    <option value="0">Select time</option>
                                    <option value="Sample">Sample</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className='col-12 all_end'>
                              <div className='nesbut all_center mt-1 ms-1 me-1 mb-1' onClick={handleClear}>Clear</div>
                              <div className='nesbut2 all_center mt-1 ms-1 me-1 mb-1' onClick={handleStartScan}>Start</div>
                            </div>
                          </div>
                        </div>
                      }
                      {activeTab === 2 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-12'>
                              <div className='row ms-0 me-0'>
                                <input type="text" className='idinput' placeholder='Filter running executions by ID' />
                                <div className='idstatus ms-2'><CiCirclePlus className="me-2 iconnav" />Status</div>
                              </div>
                            </div>
                            <div className='col-12 mt-2'>
                              <table className='table newtable'>
                                <thead>
                                  <tr>
                                    <th>Scan ID</th>
                                    <th>Device Name</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th className='all_startegg'>Scanned Eggs</th>
                                    <th className='all_endegg'>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((item) => (
                                    <tr>
                                      <td>{item.scanId}</td>
                                      <td>{item.device}</td>
                                      <td>{item. scheduledDate}-{item. scheduledTime}</td>
                                      <td>{item.Status}</td>
                                      <td className='all_startegg'>
                                        <img className='me-1' src="/images/egg-male.svg" alt="" />
                                        {item.EggsM}
                                        <img className='me-1 ms-2' src="/images/egg-female.svg" alt="" />
                                        {item.EggsF}
                                      </td>

                                      <td className='all_endegg'>
                                        {
                                          item.Actions === 'play' ? (
                                            <FiPlayCircle className="me-2 iconnav1" /> 
                                          ) : (
                                            <LuPauseCircle className="me-2 iconnav1" />
                                          )
                                        }
                                        <HiOutlineStopCircle className="me-2 iconnav2" onClick={(e) => handleDelete(item._id)}/>
                                        <LuEye   className="me-2 iconnav2" />
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
                                    <MdOutlineKeyboardDoubleArrowLeft  className="me-2 arorboxicon" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardArrowLeft  className="me-2 arorboxicon" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardArrowRight  className="me-2 arorboxicon2" />
                                  </div>
                                  <div className='arorbox ms-1 me-1'>
                                    <MdKeyboardDoubleArrowRight  className="me-2 arorboxicon2" />
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

      {/* <AlertBox title={"Are you sure you want to stop scanning?"} descripton={"This action cannot be undone and will permanently interrupt the scan, BAI-LYR-001. Click Terminate if you want to stop scanning."} button01={"Cancel"} button02={"Stop"}/> */}
      {/* <ScanVideoPopUp id={"BAI-LYR-001"} /> */}

      <StatusAlert title={"Scan Started"} description={"Initiated scan BAI-LYR-001 and is now running. "} /> {/*title={"text"} description={"text"}*/}
    </div>
  );
};

export default ScanNew;
