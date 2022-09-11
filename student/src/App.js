import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from './components/Signup';
import Login from './components/Login';
import CheckinList from "./components/CheckinList";
import NewCheckin from "./components/NewCheckin";
import CreateContract from './components/CreateContract';
import MyContracts from './components/MyContracts';
import ContractSummary from './components/ContractSummary';

function App() {
  const user = localStorage.getItem('token')
  return (
    <Routes>
      {user && <Route path="/" exact element={<Main />} />}
      <Route path="/signup" exact element={<Signup />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/contracts" exact element={<MyContracts />} />
      <Route path="/checkins" exact element={<CheckinList />} />
      <Route path="/checkin/new" exact element={<NewCheckin />} />
      <Route path="/contract/new" exact element={<CreateContract />} />
      <Route path="/contractSummary" exact element={<ContractSummary />} />
    </Routes>
  );
}

export default App;
