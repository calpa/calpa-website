/* eslint react/prop-types: 0 */
import { Grid, Typography } from '@mui/material';
import React from 'react';
import Layout from '../components/Layout';

function Page() {
  return (
    <Layout>
      <Grid
        container
      >
        <Grid
          item
          xs
          sx={{
            background: '#0d3a5f',
            height: '300px',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>
            Code
          </Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            background: '#2e5c6e',
            color: 'white',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>
            Work
          </Typography>
        </Grid>
        <Grid
          item
          xs
          sx={{
            background: '#3a8fb7',
            color: 'white',
            height: '300px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography>
            Life
          </Typography>
        </Grid>
      </Grid>

    </Layout>
  );
}

export default Page;
