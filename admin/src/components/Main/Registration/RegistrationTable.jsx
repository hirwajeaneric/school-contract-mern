import React from 'react';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const columns = [
    { field: '_id', 
        headerName: '_ID', 
        hide:true
    },
    {
        field: 'regNumber',
        headerName: 'Registration Number',
        width: 230,
    },
    {
        field: 'name',
        headerName: 'Name',
        type: 'date',
        width: 300,
    },
    {
        field: 'dueAmount',
        headerName: 'Due Amount',
        type: 'number',
        width: 230,
    },
    {
        field: 'numberOfCourses',
        headerName: 'Number of Courses',
        type: 'number',
        width: 220,
    }
]

function CustomToolbar() {
    return (
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
}

var rows = [];

const RegistrationTable = ({registration}) => {
    rows = registration;
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

export default RegistrationTable