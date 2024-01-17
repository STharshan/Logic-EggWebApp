import React, { useState, useRef, useCallback} from 'react';
import "./AddUserPopUp.css";
import { useNavigate } from 'react-router-dom';


const AddUserPopUp = () => {

  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstname: "",
    employeeId: "",
    email: "",
    role: "",
    password: "",
    confirmpassword: "",
  });

  const [image, setImage] = useState(null);

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const selectedFile = (event.target.files[0]);

    if (selectedFile) {
      setFormData({
        ...formData,
        image: selectedFile,
      })
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

  const isValidEmailFormat = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
 }

  const onSave = useCallback(async () => {
    try{
      if (
        !formData.firstname ||
        !formData.employeeId ||
        !formData.email ||
        formData.role === '0' ||
        !formData.password ||
        !formData.confirmpassword ||
        !formData.image
      ) {
        window.alert('Please fill in all fields');
        return;
      }
     
      if (!isValidEmailFormat(formData.email)) {
        window.alert("Invalid email format!");
        return;
      }
      if (formData.password !== formData.confirmpassword){
        window.alert("Passwords do not match!");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('firstname', formData.firstname);
      formDataToSend.append('employeeId', formData.employeeId);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('role', formData.role);
      formDataToSend.append('password', formData.password);
      formDataToSend.append('confirmpassword', formData.confirmpassword);
      formDataToSend.append('image', image);
  
      await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        body: formDataToSend,
      });
  
      window.alert('User details saved successfully');
    } catch (error) {
      console.error('Error saving user details:', error);
      window.alert('Error saving user details');
    }
    
  }, [formData, image ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onCancel = useCallback(() => {
    navigate("/configuration");
  }, [navigate]);
  
  return (

    <div className='AlertBox'>
      <div className='mgbox'>
        <div className='row'>
          <span className='mgatx01'>Add User</span>
        </div>
        <div className='row'>
          <span className='mgatx02 mt-2'>Create new user and assign relevant role. Click save when you're done.</span>
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
              onChange={handleImageChange} 
              style={{display: 'none'}}  
            />
          </div>
          <div className='col-9'>
            <div className='row'>
              <div className='col-6'>
                <div className='row inaddus ms-1 mb-2'>
                  <label>First Name</label>
                  <input type="text" placeholder='Enter first name' onChange={handleInputChange} name='firstname'/>
                </div>
                <div className='row inaddus ms-1 mb-2'>
                  <label>Email</label>
                  <input type="email" placeholder='Enter Email' onChange={handleInputChange} name='email'/>
                </div>
              </div>
              <div className='col-6'>
                <div className='row inaddus ms-1 mb-2'>
                  <label>Employee ID</label>
                  <input type="text" placeholder='Enter employee ID' onChange={handleInputChange} name='employeeId'/>
                </div>
                <div className='row inaddus ms-1 mb-2'>
                  <label>Role</label>
                  <select name="role" id="" onChange={handleInputChange}>
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
              <input type="password" placeholder='Enter password' onChange={handleInputChange} name='password'/>
            </div>
          </div>
          <div className='col-6'>
            <div className='row inaddus ms-1 mb-2'>
              <label>Confirm Password</label>
              <input type="password" placeholder='Confirm Password' onChange={handleInputChange} name='confirmpassword'/>
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

export default AddUserPopUp;
