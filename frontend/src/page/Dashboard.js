import React, { useCallback } from 'react';
import { FiPlus } from "react-icons/fi";
import { FaRegCircle } from "react-icons/fa";
import { IoEllipsisHorizontalCircle } from "react-icons/io5";
import { LuCircleSlash2 } from "react-icons/lu";
import "./Dashboard.css";

import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import StatusAlert from "../components/StatusAlert";
import BarChart from "../components/BarChart";
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

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

  const runtable = [
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },
    {
      ScanID: "BAI-LYR-001",
      DeviceName: "BAI-Scanner-01",
      Status: "Running",
      EggsM: "225",
      EggsF: "225",
    },

  ];
  const runtable02 = [
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Active",
    },
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Busy",
    },
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Inactive",
    },
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Active",
    },
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Busy",
    },
    {
      DeviceName: "BAI-Scanner-01",
      Status: "Inactive",
    },
  ];

  const navigate = useNavigate('');

  const onNewScan = useCallback(() => {
    navigate("/scannew");
  }, [navigate]);

  return (
    <div>
      <div className="row bg_def">
        <div className="menubox">
          <SideMenu

          /> {/* set active menu (1-Dashboard / 2-Scan / 3-Analytics ...)*/}
        </div>
        <div className="contentbox">
          <div className='col-12'>
            <div className='row conboxup'>
              <NavBar title={"Dashboard"} scan={"DeActive"} /> {/* title={"text"} scan={"Active or DeActive"}*/}
            </div>
            <div className='row conboxdw'>
              <div>
                <div className='row'>
                  <div className='col-12 col-md-4'>
                    <div className='nesadash all_center mt-2' onClick={onNewScan}>
                      <FiPlus className="mt-2 ms-2 me-2 mb-2 iconnav" /> 
                      <span className="mt-2  me-2 mb-2 newscantx">New Scan</span> 
                    </div>
                    <div className='row bg_scanbox02dash me-1 mt-3'>
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

                      </div>
                    </div>
                  </div>
                  <div className='col-12 col-md-8'>
                    <span className='tichartdash'>Past Scans</span>
                    <div className='row bg_scanbox02dash mt-1'>
                      <BarChart data={data} /> {/* title={'text} data={data} startDate{'2024-01-01'} endDate{'2024-01-01'} */}
                    </div>
                  </div>
                  <div className='col-12 col-md-8 mt-3 mb-3'>
                    <span className='tichartdash2'>Running Scans</span>

                    <div className='bg_scanbox02dash mt-2'>
                      <table className='table newtabledash'>
                        <thead>
                          <tr>
                            <th>Scan ID</th>
                            <th>Device Name</th>
                            <th>Status</th>
                            <th className='all_startegg'>Scanned Eggs</th>
                          </tr>
                        </thead>
                        <tbody>
                          {runtable.map((item) => (
                            <tr>
                              <td>{item.ScanID}</td>
                              <td>{item.DeviceName}</td>
                              <td>{item.Status}</td>
                              <td className='all_startegg'>
                                <img className='me-1' src="/images/egg-male.svg" alt="" />
                                {item.EggsM}
                                <img className='me-1 ms-2' src="/images/egg-female.svg" alt="" />
                                {item.EggsF}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className='col-12 col-md-4 mt-3 mb-3'>
                    <span className='tichartdash2'>Available Devices</span>

                    <div className='bg_scanbox02dash mt-2'>
                      <table className='table newtabledash'>
                        <thead>
                          <tr>
                            <th>Device Name</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {runtable02.map((item) => (
                            <tr>
                              <td>{item.DeviceName}</td>
                              <td>
                                {
                                  item.Status === 'Active' ? (
                                    <div>
                                      <FaRegCircle className="me-2 iconnav3" />
                                      <samp>Active</samp>
                                    </div>
                                  ) : item.Status === 'Busy' ? (
                                    <div>
                                      <IoEllipsisHorizontalCircle className="me-2 iconnav2" />
                                      <samp>Busy</samp>
                                    </div>
                                  ) : item.Status === 'Inactive' ? (
                                    <div>
                                      <LuCircleSlash2 className="me-2 iconnav3" />
                                      <samp>Inactive</samp>
                                    </div>
                                  ) : null // Provide a default case or use null if necessary
                                }
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <StatusAlert title={"Scan Started"} description={"Initiated scan BAI-LYR-001 and is now running. "} /> {/* title={"text"} description={"text"}*/}
    </div>
  );
};

export default Dashboard;
