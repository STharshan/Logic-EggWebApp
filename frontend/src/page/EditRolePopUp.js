import React, { useState, useRef, useEffect, useCallback } from 'react';
import "./EditRolePopUp.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditRolePopUp = () => {

  const [isChecked, setChecked] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const [isChecked3, setChecked3] = useState(false);
  const [isChecked4, setChecked4] = useState(false);

  const handleToggle = () => {
    setChecked(!isChecked);
  };
  const handleToggle2 = () => {
    setChecked2(!isChecked2);
  };
  const handleToggle3 = () => {
    setChecked3(!isChecked3);
  };
  const handleToggle4 = () => {
    setChecked4(!isChecked4);
  };

  const navigate = useNavigate("");

  const onCancel = useCallback(() => {
    navigate("/configuration");
  }, [navigate]);

  const {id} =useParams()
  const [rolename, setRolename] = useState()

  useEffect(() => {
    axios.get('http://localhost:5000/api/role/'+id)
    .then(result => {
      console.log(result)
      setRolename(result.data.rolename)
    })
    .catch(err => console.log(err))
  }, [])  

  const onSave = async () =>{
    try{
      if (!rolename) {
        window.alert("Please enter a role name");
        return;
      }

      await axios.put("http://localhost:5000/api/updaterole/" +id, {
        rolename: rolename
      })
        window.alert("Role is updated successfully")
      }catch{
        window.alert('Error updating');
      }
  }

  return (

    <div className='AlertBox'>
      <div className='mgbox'>
        <div className='row'>
          <span className='mgatx01'>Edit Role</span>
        </div>
        <div className='row'>
          <span className='mgatx02 mt-2'>Create new user role and assign necessary privileges. Click save when you're done.</span>
        </div>
        <div className='row mt-4'>
          <div className='col-12'>
            <div className='row inaddus ms-0 me-0 mb-2'>
              <label>Role Name</label>
              <input type="text" placeholder='Enter role name' name='rolename'
                onChange={(e) => setRolename(e.target.value) }
              />            
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

export default EditRolePopUp;
