import React, { useState, useRef, useCallback } from 'react';
import "./AddRolePopUp.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddRolePopUp = () => {

  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);

  const navigate = useNavigate();

  const handleToggle = () => {
    setChecked(!isChecked);
  };
  const handleToggle2 = () => {
    setChecked2(!isChecked2);
  };
  const handleToggle3 = () => {
    setChecked2(!isChecked3);
  };
  const handleToggle4 = () => {
    setChecked2(!isChecked4);
  };

const [rolename, setRolename] = useState("");

  const onSave = async () => {
    if (!rolename) {
      window.alert('Please fill the field');
      return;
    }

    try{
      await axios.post('http://localhost:5000/api/role', {
        rolename
      })
      window.alert('User role saved successfully');
    } catch (error) {
      console.error('Error saving user role:', error);
      window.alert('Error saving user role');
    }
    
  }

  const onCancel = useCallback(() => {
    navigate("/configuration");
  }, [navigate]);

  return (

    <div className='AlertBox'>
      <div className='mgbox'>
        <div className='row'>
          <span className='mgatx01'>Add Role</span>
        </div>
        <div className='row'>
          <span className='mgatx02 mt-2'>Create new user role and assign necessary privileges. Click save when you're done.</span>
        </div>
        <div className='row mt-4'>
          <div className='col-12'>
            <div className='row inaddus ms-0 me-0 mb-2'>
              <label>Role Name</label>
              <input type="text" placeholder='Enter role name' onChange={(e) => {setRolename(e.target.value)}}/>
            </div>
          </div>
          <div className='col-6 mt-2'>
            <div className='row inaddus ms-0 mb-3'>
              <div className='col-12 all_spas'>
                <span>Configuration Settings</span>
                <div className={`ms-2 switch-container ${isChecked ? 'on' : 'off'}`} onClick={handleToggle}>
                  <div className="slider"></div>
                </div>
              </div>
            </div>
            <div className='row inaddus ms-0 mb-3'>
              <div className='col-12 all_spas'>
                <span>Performance Analytics</span>
                <div className={`ms-2 switch-container ${isChecked2 ? 'on' : 'off'}`} onClick={handleToggle2}>
                  <div className="slider"></div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-6 mt-2'>
            <div className='row inaddus ms-0 mb-3'>
              <div className='col-12 all_spas'>
                <span>Add / Monitor Devices</span>
                <div className={`ms-2 switch-container ${isChecked3 ? 'on' : 'off'}`} onClick={handleToggle3}>
                  <div className="slider"></div>
                </div>
              </div>
            </div>
            <div className='row inaddus ms-0 mb-3'>
              <div className='col-12 all_spas'>
                <span>Initiate Scan</span>
                <div className={`ms-2 switch-container ${isChecked4 ? 'on' : 'off'}`} onClick={handleToggle4}>
                  <div className="slider"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='row mt-3'>
          <div className='col-12 all_end'>
            <div className='btnmg01' onClick={onCancel}>Cancel</div>
            <div className='btnmg02' onClick={onSave}>Save</div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default AddRolePopUp;
