import React from 'react';
import { Typography } from '@mui/material';

function Date(props) {
  const { date } = props;
  return (
    <Typography sx={{
      backgroundColor: 'blue.main',
      color: '#fff',
      padding: '0.8em',
      marginRight: '10px',
    }}
    >
      {date}
    </Typography>
  );
}

export default Date;
