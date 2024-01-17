import React, { useState } from 'react';
import { HiOutlineStopCircle } from "react-icons/hi2";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { VscCalendar } from "react-icons/vsc";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { FiUser } from "react-icons/fi";
import { LuTimer } from "react-icons/lu";
import "./AnalyticsOverview.css";

import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import StatusAlert from "../components/StatusAlert";
import AlertBox from "../components/AlertBox";
import BarChart from "../components/BarChart";

const AnalyticsOverview = () => {

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

  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const runtable = [
    {
      ScanID: "BAI-LYR-001",
      EggsM: "225",
      EggsF: "225",
      DateTime: "12/20/2023 - 10:17 PM",
      Initiatedby: "Timothy Samuel",
      Status: "Completed",
    },
    {
      ScanID: "BAI-LYR-001",
      EggsM: "225",
      EggsF: "225",
      DateTime: "12/20/2023 - 10:17 PM",
      Initiatedby: "Timothy Samuel",
      Status: "Stopped",
    },
    {
      ScanID: "BAI-LYR-001",
      EggsM: "225",
      EggsF: "225",
      DateTime: "12/20/2023 - 10:17 PM",
      Initiatedby: "Timothy Samuel",
      Status: "Failed",
    },
    {
      ScanID: "BAI-LYR-001",
      EggsM: "225",
      EggsF: "225",
      DateTime: "12/20/2023 - 10:17 PM",
      Initiatedby: "Timothy Samuel",
      Status: "Completed",
    },

  ];
  const details = {
    LastScan: "12 Dec 2023",
    eggM: "240",
    eggF: "240",
    eggAll: "480",
    user: "Timothy Samuel",
    timer: "21 Hours 43 Minutes",
  };
  const data = {
    labels: ['2024-01-01', '2024-01-02', '2023-01-03', '2024-01-05', '2024-01-06', '2024-01-07'],
    datasets: [
      {
        label: 'Eggs',
        data: [13, 6, 9, 12, 36, 10],
        backgroundColor: '#D9D9D9',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  return (
    <div>
      <div className="row bg_def">
        <div className="menubox">
          <SideMenu status={3} /> {/* set active menu (1-Dashboard / 2-Scan / 3-Analytics ...)*/}
        </div>
        <div className="contentbox">
          <div className='col-12'>
            <div className='row conboxup'>
              <NavBar title={"Analytics"} scan={"Active"} /> {/* title={"text"} scan={"Active or DeActive"}*/}
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
                        Overview
                      </div>
                      <div
                        className={activeTab === 2 ? 'tabtx tabActive' : 'tabtx'}
                        onClick={() => handleTabClick(2)}
                      >
                        History
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2'>
                    <div className="details-box">
                      {activeTab === 1 &&
                        <div>
                          <div className='row'>
                            <div className='col-12 col-md-4'>
                              <div className='row bg_scanbox02 me-1'>
                                <div>
                                  <div className='col-12 space_nam'>
                                    <span className='lsantx01'>Last Scan</span>
                                    <span className='lsantx02'>{details.LastScan}</span>
                                  </div>
                                  <div className='col-12 mt-3'>
                                    <div className="row">
                                      <span className='lsantx03'>{details.eggAll}</span>
                                    </div>
                                    <div className="row mt-1">
                                      <span className='lsantx04'>Total eggs scanned </span>
                                    </div>
                                    <div className="row mt-1">
                                      <span className='lsantx04'>{details.eggM}M / {details.eggF}F</span>
                                    </div>
                                  </div>

                                  <div className='col-12 mt-4'>
                                    <div className="row mt-2">
                                      <span className='lsantx05'> <FiUser className="me-2 iconnav3" />{details.user}</span>
                                    </div>
                                    <div className="row mt-2">
                                      <span className='lsantx05'> <LuTimer className="me-2 iconnav3" />{details.timer}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className='col-12 col-md-8'>
                              <div className='row bg_scanbox02'>
                                <BarChart title={'Number of eggs scanned during'} data={data} dateActive={"Active"} startDate={data.labels[0]} endDate={data.labels[data.labels.length - 1]} /> {/* title={'text} data={data} startDate{'2024-01-01'} endDate{'2024-01-01'} */}
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      {activeTab === 2 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-9'>
                              <div className='row ms-0 me-0'>
                                <input type="text" className='idinput' placeholder='Filter execution history by ID or Initiator' />
                                <div className='idstatus ms-2' onClick={handleButtonClick}><VscCalendar className="me-2 iconnav3" />Set date range</div>
                              </div>
                              {isOpen && (
                                <div className="date-input-box mt-2">
                                  <label>
                                    Start Date:
                                    <input type="date" />
                                  </label>
                                  <label className='ms-4'>
                                    End Date:
                                    <input type="date" />
                                  </label>
                                </div>
                              )}
                            </div>
                            <div className='col-3 all_end'>
                              <div className='dwbtn'>Download</div>
                            </div>
                            <div className='col-12 mt-2'>
                              <table className='table newtable'>
                                <thead>
                                  <tr>
                                    <th>Scan ID</th>
                                    <th>Scanned Eggs</th>
                                    <th>Date & Time</th>
                                    <th>Initiated by</th>
                                    <th className='all_endegg'>Status</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {runtable.map((item) => (
                                    <tr>
                                      <td>{item.ScanID}</td>
                                      <td className='all_startegg'>
                                        <img className='me-1' src="/images/egg-male.svg" alt="" />
                                        {item.EggsM}
                                        <img className='me-1 ms-2' src="/images/egg-female.svg" alt="" />
                                        {item.EggsF}
                                      </td>
                                      <td>{item.DateTime}</td>
                                      <td>{item.Initiatedby}</td>
                                      <td className='all_endegg'>
                                        {
                                          item.Status === 'Completed' ? (
                                            <div>
                                              <FaRegCheckCircle className="me-2 iconnav3" />
                                              <samp>Completed</samp>
                                            </div>
                                          ) : item.Status === 'Stopped' ? (
                                            <div>
                                              <HiOutlineStopCircle className="me-2 iconnav1" />
                                              <samp>Stopped</samp>
                                            </div>
                                          ) : item.Status === 'Failed' ? (
                                            <div>
                                              <MdErrorOutline className="me-2 iconnav1" />
                                              <samp>Failed</samp>
                                            </div>
                                          ) : null // Provide a default case or use null if necessary
                                        }

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
                                  <span className='pagetx me-4'>Page 1 of 8</span>
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

      {/* <AlertBox title={"Are you sure you want to stop scanning?"} descripton={"This action cannot be undone and will permanently interrupt the scan, BAI-LYR-001. Click Terminate if you want to stop scanning."} button01={"Cancel"} button02={"Stop"}/> */}

      <StatusAlert title={"Scan Started"} description={"Initiated scan BAI-LYR-001 and is now running. "} /> {/*title={"text"} description={"text"}*/}
    </div>
  );
};

export default AnalyticsOverview;
