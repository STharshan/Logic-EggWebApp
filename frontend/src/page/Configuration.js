import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import { FaRegTimesCircle } from "react-icons/fa";
import { LiaUserEditSolid } from "react-icons/lia";
import "./Configuration.css";
import { Link } from 'react-router-dom';


import SideMenu from "../components/SideMenu";
import NavBar from "../components/NavBar";
import StatusAlert from "../components/StatusAlert";
import AlertBox from "../components/AlertBox";
import BarChart from "../components/BarChart";
//import AddUserPopUp from "../components/AddUserPopUp";
//import EditUserPopUp from "../components/EditUserPopUp";
//import AddRolePopUp from "../components/AddRolePopUp";
//import EditRolePopUp from "../components/EditRolePopUp";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Configuration = () => {

  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const navigate = useNavigate();

  const OnAdduser = useCallback(() => {
    navigate("/adduser");
  }, [navigate]);

  const OnAddrole = useCallback(() => {
    navigate("/addrole");
  }, [navigate]);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get/user");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await axios.get("http://localhost:5000/api/get/role");
        setInfo(responses.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const runtable01 = [
    {
      FirstName: "Timothy",
      LastName: "Samuel",
      EmployeeID: "BAI-EMP-001",
      Role: "Administrator",
    },
    {
      FirstName: "Timothy",
      LastName: "Samuel",
      EmployeeID: "BAI-EMP-001",
      Role: "Administrator",
    },
    {
      FirstName: "Timothy",
      LastName: "Samuel",
      EmployeeID: "BAI-EMP-001",
      Role: "Administrator",
    },
    {
      FirstName: "Timothy",
      LastName: "Samuel",
      EmployeeID: "BAI-EMP-001",
      Role: "Administrator",
    },
    {
      FirstName: "Timothy",
      LastName: "Samuel",
      EmployeeID: "BAI-EMP-001",
      Role: "Administrator",
    },

  ];
  const runtable02 = [
    {
      Role: "Administrator",
    },
    {
      Role: "Egg Handler",
    },
    {
      Role: "Farm Manager",
    },
    {
      Role: "Farm Owner",
    },

  ];

  return (
    <div>
      <div className="row bg_def">
        <div className="menubox">
          <SideMenu status={5} /> {/* set active menu (1-Dashboard / 2-Scan / 3-Analytics ...)*/}
        </div>
        <div className="contentbox">
          <div className='col-12'>
            <div className='row conboxup'>
              <NavBar title={"Configuration"} scan={"Active"} /> {/* title={"text"} scan={"Active or DeActive"}*/}
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
                        Users
                      </div>
                      <div
                        className={activeTab === 2 ? 'tabtx tabActive' : 'tabtx'}
                        onClick={() => handleTabClick(2)}
                      >
                        Roles
                      </div>
                    </div>
                  </div>
                  <div className='col-12 mt-2'>
                    <div className="details-box">
                      {activeTab === 1 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-9'>
                              <div className='row ms-0 me-0'>
                                <input type="text" className='idinput' placeholder='Filter execution history by ID or Initiator' />
                                <div className='idstatus ms-2'><CiCirclePlus className="me-2 iconnav" />Status</div>
                              </div>
                            </div>
                            <div className='col-3 all_end'>
                              <div className='dwbtn'onClick={OnAdduser}>Add User</div>
                            </div>
                            <div className='col-12 mt-2'>
                              <table className='table newtable'>
                                <thead>
                                  <tr>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Employee ID</th>
                                    <th>Role</th>
                                    <th className='all_endegg'>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data.map((item) => (
                                    <tr>
                                      <td>{item.firstname}</td>
                                      <td>{item.firstname}</td>
                                      <td>{item.employeeId}</td>
                                      <td>{item.role}</td>
                                      <td className='all_endegg'>
                                        <Link to={`/edituser/${item._id}`}>
                                            <LiaUserEditSolid className="me-2 iconnav3"/>
                                        </Link>
                                        <FaRegTimesCircle className="me-2 iconnav3" />
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
                      {activeTab === 2 &&
                        <div>
                          <div className='row bg_scanbox01'>
                            <div className='col-9'>
                              <div className='row ms-0 me-0'>
                                <input type="text" className='idinput' placeholder='Search roles by role name' />
                              </div>
                            </div>
                            <div className='col-3 all_end'>
                              <div className='dwbtn' onClick={OnAddrole}>Add Role</div>
                            </div>
                            <div className='col-12 mt-2'>
                              <table className='table newtable'>
                                <thead>
                                  <tr>
                                    <th>Role</th>
                                    <th className='all_endegg'>Actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {info.map((item) => (
                                    <tr>
                                      <td>{item.rolename}</td>
                                      <td className='all_endegg'>
                                        <Link to={`/editrole/${item._id}`}>
                                            <LiaUserEditSolid className="me-2 iconnav3"/>
                                        </Link>
                                        <FaRegTimesCircle className="me-2 iconnav3" />
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

      {/* <AddUserPopUp />  */}
      {/* <EditUserPopUp id={1}/> */}

      {/* <AddRolePopUp /> */}
      {/* <EditRolePopUp id={1}/> */}

      {/* <AlertBox title={"Terminate user?"} descripton={"This action cannot be undone and will permanently terminate user Thea Downs from the system resulting in revoking access to the system. To proceed click the Remove button."} button01={"Cancel"} button02={"Terminate"}/> */}
      {/* <AlertBox title={"Permanently remove user role?"} descripton={"This action cannot be undone and will permanently remove user role Hatchery Worker from the system."} button01={"Cancel"} button02={"Remove"} /> */}

      <StatusAlert title={"Scan Started"} description={"Initiated scan BAI-LYR-001 and is now running. "} /> {/*title={"text"} description={"text"}*/}
    </div>
  );
};

export default Configuration;
