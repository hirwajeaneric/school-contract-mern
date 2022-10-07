import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './styles.css';
import StudentContractTable from './StudentContractTable';
import StudentCheckinTable from './StudentCheckinTable';

const Dashboard = () => {

    const [contracts, setContracts] = useState([]);
    const [checkins, setCheckins] = useState([]);
    const [numberOfContracts, setNumberOfContracts] = useState(0);
    const [installments, setInstallments] = useState(0);
    const [numberOfInstallments, setNumberOfInstallments] = useState(0);
    const [numberOfValidContracts, setNumberOfValidContracts] = useState(0);
    const [numberOfValidCheckins, setNumberOfValidCheckins] = useState(0);
    const [numberOfPaidInstallments, setNumberOfPaidInstallments] = useState(0);

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

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/contracts/findByStatus?status=Approved`)
        .then((res) => {
            setNumberOfValidContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidContracts]);


    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/checkin/findByStatus?status=Approved`)
        .then((res) => {
            setNumberOfValidCheckins(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidCheckins]);
    
    return (
    <div className='dashboard-container'>
        <div className='title-headers'>
            <h1>Dashboard - Home</h1>
        </div>
        <div className='some-stats'>
            <div className='numberOfContracts'>
                <p className='yourcontracts-title'>Contracts</p>
                <h1>{numberOfContracts}</h1>
            </div>
            <div className='numberOfInstallments'>
                <p className='yourInstallments-title'>Installments</p>
                <h1>{numberOfInstallments}</h1>
            </div>
            <div className='numberOfValidContracts'>
                <p className='yourValidContracts-title'>Valid Contracts</p>
                <h1>{numberOfValidContracts}/{numberOfContracts}</h1>
            </div>
            <div className='numberOfPaidInstallments'>
                <p className='yourPaidInstallments-title'>Paid Installments</p>
                <h1>{numberOfPaidInstallments}</h1>
            </div>
            <div className='numberOfPaidInstallments'>
                <p className='yourPaidInstallments-title'>Valid Installment Payments</p>
                <h1>{numberOfValidCheckins}/{numberOfInstallments}</h1>
            </div>
        </div>
        <div className="some-tables">
            <div className='dashboard-tables'>
                <div className="contract-table-space">
                    <h3 className='table-title'>Contracts</h3>
                    <StudentContractTable contracts={contracts} />
                </div>
                <div className="checkin-table-space">
                    <h3 className='table-title'>Checkins</h3>
                    <StudentCheckinTable checkins={checkins} />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Dashboard