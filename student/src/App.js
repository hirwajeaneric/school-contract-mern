import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/Main/CheckinList";
import UpdateCheckin from "./components/Main/UpdateCheckin";
import CreateContract from './components/Main/CreateContract';
import MyContracts from './components/Main/MyContracts';
import ContractSummary from './components/Main/ContractSummary';
import Notifications from './components/Main/Notifications'
import NotificationDetails from './components/Main/NotificationDetails';

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user &&
      <Route path="/" exact element={<Main />} >  
        <Route path="contracts/" element={<MyContracts />} />
        <Route path="new-contract/" element={<CreateContract />} />
        <Route path="contract-summary/" element={<ContractSummary />} />
        <Route path="checkins/" element={<CheckinList />} />
        <Route path="update-checkin/" element={<UpdateCheckin />} />
        <Route path="notifications/" element={<Notifications />} />
        <Route path='notification-details' element={<NotificationDetails/>} />
      </Route>
      }
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} /> 
      
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/contracts" exact element={<Navigate replace to="/login" />} />
      <Route path="/checkins" exact element={<Navigate replace to="/login" />} />
      <Route path="/new-contract" exact element={<Navigate replace to="/login" />} />
      <Route path="/contractSummary" exact element={<Navigate replace to="/login" />} />
      <Route path="/update-checkin" exact element={<Navigate replace to="/login" />} />
      <Route path="/notification-details" exact element={<Navigate replace to="/login"/>}/>
    </Routes>
  );
}

export default App;
