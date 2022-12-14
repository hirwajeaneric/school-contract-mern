import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import ViewTableAction from '../TableActions/ViewTableAction';

const columns = [
    { field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'regNumber',
        headerName: 'Registration Number',
        width: 80,
    },
    {
        field: 'creationDate',
        headerName: 'Creation Date',
        type: 'date',
        width: 120,
    },
    {
        field: 'dueAmount',
        headerName: 'Due Amount',
        type: 'number',
        width: 80,
    },
    {
        field: 'paidAmount',
        headerName: 'Paid Amount',
        type: 'number',
        width: 80,
    },
    {
        field: 'amountPerInstallment',
        headerName: 'Installment',
        width: 80,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 80,
    },
    {
        field: 'actions',
        headerName: 'Actions',
        type: 'actions',
        width: 50,
        renderCell: (params) => <ViewTableAction {...{params, path: 'contract'}} />
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
                pageSize={4}
                rowsPerPageOptions={[4]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
                // components={{Toolbar: GridToolbar}}
            />
        </Box>
    );
}

export default StudentContractTable