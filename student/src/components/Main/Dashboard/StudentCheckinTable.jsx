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
        width: 70,
        hide: true
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        type: 'date',
        width: 120,
    },
    {
        field: 'submitDate',
        headerName: 'Submit Date',
        type: 'date',
        width: 120,
    },
    {
        field: 'dueAmount',
        headerName: 'Due Amount',
        type: 'number',
        width: 70,
    },
    {
        field: 'paidAmount',
        headerName: 'Paid Amount',
        type: 'number',
        width: 70,
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
        renderCell: (params) => <ViewTableAction {...{params, path: 'checkin'}} />
    },
]

var rows = [];

const StudentCheckinTable = ({checkins}) => {
    rows = checkins;
    return (
        <Box sx={{height: 350, width:'100%'}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={4}
                rowsPerPageOptions={[4]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
            />
        </Box>
    );
}

export default StudentCheckinTable