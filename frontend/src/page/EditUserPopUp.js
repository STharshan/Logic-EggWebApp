import React, { useState, useRef, useCallback, useEffect } from 'react';
import "./EditUserPopUp.css";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditUserPopUp = () => {

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("./images/profile.jpg");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      // Read and display the image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      // Handle the selected file as needed, e.g., upload to a server, update state, etc.
      console.log('Selected File:', selectedFile);
    }
  };
  const navigate = useNavigate("");

  const onCancel = useCallback(() => {
    navigate("/configuration");
  }, [navigate]);

  const {id} =useParams()
  const [firstname, setFirstname] = useState();
  const [employeeId, setEmployeeId] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/'+id)
    .then(result => {
      console.log(result)
      setFirstname(result.data.firstname)
      setEmployeeId(result.data.employeeId)
      setEmail(result.data.email)
      setRole(result.data.role)
      setPassword(result.data.password)
      setConfirmpassword(result.data.confirmpassword)

    })
    .catch(err => console.log(err))
  }, [])  

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
 }

  const onSave = async () =>{
    try{
      if (!firstname || !employeeId || !email || !role || !password || !confirmpassword) {
        window.alert("Please enter required filled");
        return;
      }
     
      if (!isValidEmailFormat(email)) {
        window.alert("Invalid email format!");
        return;
      }
      if (password !== confirmpassword){
        window.alert("Passwords do not match!");
        return;
      }

      await axios.put("http://localhost:5000/api/updateuser/" +id, {
        firstname,
        employeeId,
        email,
        role,
        password,
        confirmpassword,
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
        <span className='mgatx01'>Edit User</span>
      </div>
      <div className='row'>
        <span className='mgatx02 mt-2'>Make changes to the user profile here. Click save when you're done.</span>
      </div>
      <div className='row mt-4'>
      <div className='col-3'>
            <img
              className='profiladd'
              src={previewImage || "./images/useradd.png"}
              alt=""
              onClick={handleImageClick}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
        </div>
        <div className='col-9'>
          <div className='row'>
            <div className='col-6'>
              <div className='row inaddus ms-1 mb-2'>
                <label>First Name</label>
                <input type="text" placeholder='Enter first name'
                  onChange={(e) => setFirstname(e.target.value) } name='firstname'
                />
              </div>
              <div className='row inaddus ms-1 mb-2'>
                <label>Email</label>
                <input type="email" placeholder='Enter Email'
                  onChange={(e) => setEmail(e.target.value) } name='email'
                />
              </div>
            </div>
            <div className='col-6'>
              <div className='row inaddus ms-1 mb-2'>
                <label>Employee ID</label>
                <input type="text" placeholder='Enter employee ID'
                  onChange={(e) => setEmployeeId(e.target.value) } name='employeeId'
                />
              </div>
              <div className='row inaddus ms-1 mb-2'>
                <label>Role</label>
                <select name="role" id="" onChange={(e) => setRole(e.target.value) }>
                  <option value="0">Select role</option>
                  <option value="Sample">Sample</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className='col-6'>
          <div className='row inaddus ms-1 mb-2'>
            <label>Password</label>
            <input type="password" placeholder='Enter password' name='password'
              onChange={(e) => setPassword(e.target.value) }
            />
          </div>
        </div>
        <div className='col-6'>
          <div className='row inaddus ms-1 mb-2'>
            <label>Confirm Password</label>
            <input type="password" placeholder='Confirm Password' name='confirmpassword'
              onChange={(e) => setConfirmpassword(e.target.value) }
            />
          </div>
        </div>
      </div>
      <div className='row mt-3'>
        <div className='col-12 all_end'>
          <div className='btnmg01' onClick={onCancel}>Cancel</div>
          <div className='btnmg02' onClick={onSave}>Save Changes</div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default EditUserPopUp;
