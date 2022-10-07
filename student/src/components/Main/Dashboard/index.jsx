import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './styles.css';
import StudentContractTable from './StudentContractTable';
import StudentCheckinTable from './StudentCheckinTable';

const Dashboard = () => {

    const [contracts, setContrats] = useState([]);
    const [checkins, setCheckins] = useState([]);
    const [numberOfContracts, setNumberOfContracts] = useState(0);
    const [installments, setInstallments] = useState(0);
    const [numberOfInstallments, setNumberOfInstallments] = useState(0);
    const [numberOfValidContracts, setNumberOfValidContracts] = useState(0);
    const [numberOfValidCheckins, setNumberOfValidCheckins] = useState(0);
    const [numberOfPaidInstallments, setNumberOfPaidInstallments] = useState(0);

    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/contracts/findByRegNumber?regNumber=${regNo}`)
        .then((res) => {
            setNumberOfContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfContracts]);

    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/checkin/findByRegNumber?regNumber=${regNo}`)
        .then((res) => {
            setNumberOfInstallments(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfInstallments]);

    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/contracts/findByStatus?regNumber=${regNo}&status=Approved`)
        .then((res) => {
            setNumberOfValidContracts(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidContracts]);


    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/checkin/findByStatus?regNumber=${regNo}&status=Approved`)
        .then((res) => {
            setNumberOfValidCheckins(res.data.length)
        })
        .catch(error => {
            console.log(error);
        })
    },[numberOfValidCheckins]);
    
    useEffect(()=>{
        const regNo = localStorage.getItem("id");
        axios.get(`http://localhost:8080/api/checkin/findByRegNumber?regNumber=${regNo}`)
        .then((res) => {
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
    },[]);

    return (
    <div className='dashboard-container'>
        <div className='title-headers'>
            <h1>Dashboard</h1>
            {/* <h3>Home</h3> */}
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