import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SignIn from "./page/SignIn";
import Dashboard from "./page/Dashboard";
import ScanNew from "./page/ScanNew";
import AnalyticsOverview from "./page/AnalyticsOverview";
import DeviceAdd from "./page/DeviceAdd";
import Configuration from "./page/Configuration";
import AddRolePopUp from "./page/AddRolePopUp";
import AddUserPopUp from "./page/AddUserPopUp";
import EditUserPopUp from "./page/EditUserPopUp";
import EditRolePopUp from "./page/EditRolePopUp";
import ScanVideoPopUp from "./components/ScanVideoPopUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scannew" element={<ScanNew />}/>
        <Route path="/analyticsoverview" element={<AnalyticsOverview />}/>
        <Route path="/deviceadd" element={<DeviceAdd />}/>
        <Route path="/configuration" element={<Configuration />}/>
        <Route path="/addrole" element={<AddRolePopUp />}/>
        <Route path="/adduser" element={<AddUserPopUp/>}/>
        <Route path="/edituser/:id" element={<EditUserPopUp/>}/>
        <Route path="/editrole/:id" element={<EditRolePopUp/>}/>
        <Route path="/scanvediopopup" element={<ScanVideoPopUp/>}/>
      </Routes>
    </Router> 
  );
}

export default App;
