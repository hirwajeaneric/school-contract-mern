import { Preview } from '@mui/icons-material'
import { Box, IconButton, Tooltip } from '@mui/material'
import React from 'react'

const ViewTableAction = ({params, path}) => {
  return (
    <Box>
      <Tooltip title='View Details'>
        <IconButton onClick={()=>{
            window.location.href=`${path}/${params.row._id}`
          }}>
          <Preview />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default ViewTableAction