import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './styles.css';
import StudentContractTable from './StudentContractTable';
import StudentCheckinTable from './StudentCheckinTable';
import ContractsPieChart from './ContractsPieChart';
// import {
//     Chart as ChartJs,
//     CategoryScale, 
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
// } from 'chart.js';

const Dashboard = () => {

    const [contracts, setContracts] = useState([]);
    const [checkins, setCheckins] = useState([]);
    const [numberOfContracts, setNumberOfContracts] = useState(0);
    const [installments, setInstallments] = useState(0);
    const [numberOfInstallments, setNumberOfInstallments] = useState(0);
    const [numberOfValidContracts, setNumberOfValidContracts] = useState(0);
    const [numberOfPendingContracts, setNumberOfPendingContracts] = useState(0);
    const [numberOfInvalidContracts, setNumberOfInvalidContracts] = useState(0);
    const [numberOfValidCheckins, setNumberOfValidCheckins] = useState(0);
    const [numberOfPaidInstallments, setNumberOfPaidInstallments] = useState(0);
    const [numberOfRegisteredStudents, setNumberOfRegisteredStudents] = useState(0);

    //Loading contract list
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/contracts/list`)
        .then((res) => {
            setNumberOfContracts(res.data.length);
            res.data.forEach(contract => {
                contract.id = contract._id;
                setContracts(res.data);
            });
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfContracts]);

    //Loading checkin list & Loading the number of paid installments
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/checkin/list`)
        .then((res) => {
            setNumberOfInstallments(res.data.length);
            res.data.forEach(checkin => {
                checkin.id = checkin._id;
                setCheckins(res.data);
            });
            setInstallments(res.data);
            let paidInstallments = 0;
            res.data.forEach(installment => {
                if (installment.paidAmount !== 0) {
                    paidInstallments++
                }
                setNumberOfPaidInstallments(paidInstallments);
            });
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfInstallments]);

    //Loading Approved contracts
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/contracts/findAllByStatus?status=Approved`)
        .then((res) => {
            setNumberOfValidContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidContracts]);

    //Loading Rejected contracts
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/contracts/findAllByStatus?status=Rejected`)
        .then((res) => {
            setNumberOfInvalidContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfInvalidContracts]);

    //Loading Pending contracts
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/contracts/findAllByStatus?status=Pending`)
        .then((res) => {
            setNumberOfPendingContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfPendingContracts]);

    //Loading valid installment payments
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/checkin/findAllByStatus?status=Approved`)
        .then((res) => {
            setNumberOfValidCheckins(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidCheckins]);
    
    //Loading registrered students
    useEffect(()=>{
        axios.get(`http://localhost:8080/api/registration/list`)
        .then((res) => {
            setNumberOfRegisteredStudents(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfRegisteredStudents]);


    return (
    <div className='dashboard-container'>
        <div className='title-headers'>
            <span className="dashboard-title">
                <h1>Dashboard</h1>&nbsp;&nbsp;&nbsp;&nbsp;
                <h4>-&nbsp;&nbsp;&nbsp; Home</h4>    
            </span>
        </div>
        <div className='some-stats'>
            <div className='numberOfContracts'>
                <p className='yourcontracts-title'>Contracts</p>
                <h1>{numberOfContracts}</h1>
            </div>
            <div className='numberOfValidContracts'>
                <p className='yourValidContracts-title'>Valid Contracts</p>
                <h1>{numberOfValidContracts}/{numberOfContracts}</h1>
            </div>
            <div className='numberOfInstallments'>
                <p className='yourInstallments-title'>Installments</p>
                <h1>{numberOfInstallments}</h1>
            </div>
            <div className='numberOfPaidInstallments'>
                <p className='yourPaidInstallments-title'>Paid Installments</p>
                <h1>{numberOfPaidInstallments}</h1>
            </div>
            <div className='numberOfValidInstallment'>
                <p className='yourValidInstallments-title'>Valid Installment Payments</p>
                <h1>{numberOfValidCheckins}/{numberOfInstallments}</h1>
            </div>
        </div>
        <div className="some-tables">
            <div className='dashboard-tables'>
                {/* <div className="contract-chart-space">
                    <ContractsPieChart />
                </div> */}
                <div className="contract-table-space">
                    <h3 className='dashboard-table-title'>Contracts</h3>
                    <StudentContractTable contracts={contracts} />
                </div>
                <div className="checkin-table-space">
                    <h3 className='dashboard-table-title'>Installments</h3>
                    <StudentCheckinTable checkins={checkins} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard