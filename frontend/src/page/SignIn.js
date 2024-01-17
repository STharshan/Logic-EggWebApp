import React, { useState } from "react";
import "./SignIn.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if(!employeeId){ 
        window.alert("Invalid credentials")
        return;
      }
      if(!password){
        window.alert("Invalid password")
        return;
      }
      await axios.post("http://localhost:5000/api/login", {
        employeeId,
        password,
      })
      .then(res =>{
        if (res.data.status==="success") {
          console.log(res.data.message); 
          navigate("/dashboard")
        } else {
          console.error("Invalid response format:", res);
        }
      })
    
    } catch (error) {
      console.error("Error during login:", error.res?.data?.message);
      window.alert("Invalid credentials")

    }
  };
  


  return (
    <div>

      <div className="row">
        <div className="bg_black col-12">
          <div className="row">
            <div className="col-6">
              <div className="row upbox">
                <span className="logotx"><img className="me-2" src="./images/egg.png" alt="" /> GENESYS</span>
              </div>
              <div className="row botbox">
                <span className="bottx ">Revolutionizing poultry farming with our non-invasive pre-incubation gender determination system, utilizing machine learning for efficient and ethical chick sexing.</span>
              </div>
            </div>
            <div className="col-6">
              <div className="row bg_white">
                <div className="col-12 ">
                  <div className="row">
                    <span className="logtx01">Login to your account</span>
                  </div>
                  <div className="row mt-1">
                    <span className="logtx02 mb-3">Enter your organizational credentials to proceed</span>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Employee ID</label>
                        <input className="loginput" type="text" placeholder="Enter your Employee ID" 
                          value={employeeId} onChange={handleEmployeeIdChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center">
                      <div className="row col-7">
                        <label className="loglab mb-1">Password</label>
                        <input className="loginput" type="password" 
                          placeholder="Enter your Password" value={password} onChange={handlePasswordChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12 all_center mt-3">
                      <div className="col-7 space_bet">
                        <span className="fog_tx">Forgot password?</span>
                        <button className="btn btn-dark" onClick={handleLogin}>Login</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
