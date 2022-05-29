import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';

const defaultPageTitle = 'Calpa\'s Blog';

function Layout({ pageTitle = defaultPageTitle, children }) {
  return (
    <>
      <Helmet title={pageTitle} />
      <NavBar />
      <Grid
        container
        xs={12}
        sx={{
          backgroundColor: '#f4f4f4',
          // minHeight: '100vh',
        }}
      >
        {children}
      </Grid>
    </>
  );
}

export default Layout;

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
