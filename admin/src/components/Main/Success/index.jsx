import React from 'react'

const Success = ({message}) => {
  return (
    <div style={{
      backgroundColor: "#ccffdd", 
      padding: "10px",
      width: '100%',
      color: 'green',
      border: '1px solid green'}}>
          {message}
    </div>
  )
}

export default Success