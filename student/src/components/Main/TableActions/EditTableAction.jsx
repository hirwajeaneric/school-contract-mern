import { Edit } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import React from 'react';

const EditTableAction = ({params, path}) => {
  return (
    <Box>
      <Tooltip title='Edit'>
        <IconButton onClick={()=>{
            window.location.href=`${path}/${params.row._id}`
          }}>
          <Edit />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default EditTableAction