import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import TableActions from '../TableActions/TableActions';

const columns = [
    { field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'regNumber',
        headerName: 'Registration Number',
        width: 100,
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        type: 'date',
        width: 150,
    },
    {
        field: 'dueAmount',
        headerName: 'Due Amount',
        type: 'number',
        width: 100,
    },
    {
        field: 'paidAmount',
        headerName: 'Paid Amount',
        type: 'number',
        width: 110,
    },
    {
        field: 'amountPerInstallment',
        headerName: 'Installment',
        width: 100,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 150,
        renderCell: (params) => <TableActions {...{params, viewPath: 'contract' ,editPath: 'update-contract'}} />
    },
]

var rows = [];

const StudentContractTable = ({contracts}) => {
    rows = contracts;
    return (
        <Box sx={{height: 350, width:'100%'}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
                components={{Toolbar: GridToolbar}}
            />
        </Box>
    );
}

export default StudentContractTable