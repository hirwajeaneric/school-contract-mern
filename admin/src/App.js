import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/Main/CheckinList";
import UpdateCheckin from "./components/Main/UpdateCheckin";
import UpdateContract from './components/Main/UpdateContract';
import ListOfContracts from './components/Main/ListOfContracts';
import ContractDetails from "./components/Main/ContractDetails";

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user &&
      <Route path="/" exact element={<Main />} >  
        <Route  path="contracts/" element={<ListOfContracts />} />
        <Route path="update-contract/:id" element={<UpdateContract />} />
        <Route path="contract/:id" element={<ContractDetails />} />
        <Route path="checkins/" element={<CheckinList />} />
        <Route path="update-checkin/:id" element={<UpdateCheckin />} />
      </Route>
      }
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} /> 
      
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/contracts" exact element={<Navigate replace to="/login" />} />
      <Route path="/checkins" exact element={<Navigate replace to="/login" />} />
      <Route path="/update-contract/:id" exact element={<Navigate replace to="/login" />} />
      <Route path="contract/:id" exact element={<Navigate replace to="/login" />} />
      <Route path="/update-checkin/:id" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
