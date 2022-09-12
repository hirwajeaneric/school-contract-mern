import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/Main/CheckinList";
import NewCheckin from "./components/Main/NewCheckin";
import CreateContract from './components/Main/CreateContract';
import MyContracts from './components/Main/MyContracts';
import ContractSummary from './components/Main/ContractSummary';

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user &&
      <Route path="/" exact element={<Main />} >  
        <Route path="contracts/" element={<MyContracts />} />
        <Route path="new-contract/" element={<CreateContract />} />
        <Route path="contractSummary/" element={<ContractSummary />} />
        <Route path="checkins/" element={<CheckinList />} />
        <Route path="new-checkin/" element={<NewCheckin />} />
      </Route>
      }
      <Route path="signup" exact element={<Signup />} />
      <Route path="login" exact element={<Login />} /> 
      
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/contracts" exact element={<Navigate replace to="/login" />} />
      <Route path="/checkins" exact element={<Navigate replace to="/login" />} />
      <Route path="/new-contract" exact element={<Navigate replace to="/login" />} />
      <Route path="/contractSummary" exact element={<Navigate replace to="/login" />} />
      <Route path="/new-checkin" exact element={<Navigate replace to="/login" />} />
    </Routes>
  );
}

export default App;
