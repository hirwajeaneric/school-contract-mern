import React from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
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
        width: 150,
    },
    {
        field: 'dueDate',
        headerName: 'Due Date',
        type: 'date',
        width: 200,
    },
    {
        field: 'submitDate',
        headerName: 'Submit Date',
        type: 'date',
        width: 200,
    },
    {
        field: 'dueAmount',
        headerName: 'Due Amount',
        type: 'number',
        width: 110,
    },
    {
        field: 'paidAmount',
        headerName: 'Paid Amount',
        type: 'number',
        width: 110,
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
        width: 120,
        renderCell: (params) => <TableActions {...{params, viewPath: 'checkin' ,editPath: 'update-checkin'}} />
    },
]

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

var rows = [];

const StudentCheckinTable = ({checkins}) => {
    rows = checkins;
    return (
        <Box sx={{height: 350, width:'100%'}}>
            <DataGrid 
                rows={rows}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
                experimentalFeatures={{newEditingApi: true}}
                components={{Toolbar: CustomToolbar}}
            />
        </Box>
    );
}

export default StudentCheckinTable