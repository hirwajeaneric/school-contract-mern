import { createContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/Main/CheckinList";
import UpdateCheckin from "./components/Main/UpdateCheckin";
import UpdateContract from './components/Main/UpdateContract';
import ListOfContracts from './components/Main/ListOfContracts';
import ContractDetails from "./components/Main/ContractDetails";
import CheckinDetails from "./components/Main/CheckinDetails";
import Registration from "./components/Main/Registration";
import Dashboard from "./components/Main/Dashboard";

export const ServerResponseContext = createContext();
export const ServerResponseContextSetter = createContext();

function App() {
  const [serverResponse, setServerResponse] = useState({
    message:'',
    visible: false
  });

  const user = localStorage.getItem('accToken')
  return (
    <ServerResponseContext.Provider value={serverResponse}>
      <ServerResponseContextSetter.Provider value={setServerResponse}>
        <Routes>
          {user &&
          <Route path="/" exact element={<Main />} >  
            <Route path="/" element={<Dashboard />} />
            <Route  path="contracts/" element={<ListOfContracts />} />
            <Route path="update-contract/:id" element={<UpdateContract />} />
            <Route path="contract/:id" element={<ContractDetails />} />
            <Route path="checkins/" element={<CheckinList />} />
            <Route path="checkin/:id" element={<CheckinDetails />} />
            <Route path="update-checkin/:id" element={<UpdateCheckin />} />
            <Route path="registration" element={<Registration />} />
          </Route>
          }
          <Route path="signup" exact element={<Signup />} />
          <Route path="login" exact element={<Login />} /> 
          
          <Route path="/" exact element={<Navigate replace to="/login" />} />
          <Route path="/contracts" exact element={<Navigate replace to="/login" />} />
          <Route path="/checkins" exact element={<Navigate replace to="/login" />} />
          <Route path="/update-contract/:id" exact element={<Navigate replace to="/login" />} />
          <Route path="checkin/:id" exact element={<Navigate replace to="/login" />} />
          <Route path="contract/:id" exact element={<Navigate replace to="/login" />} />
          <Route path="/update-checkin/:id" exact element={<Navigate replace to="/login" />} />
          <Route path="registration" exact element={<Navigate replace to="/login" />} />
        </Routes>
      </ServerResponseContextSetter.Provider>
    </ServerResponseContext.Provider>
  );
}

export default App;
