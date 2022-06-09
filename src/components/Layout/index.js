import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

// components
import NavBar from '../NavBar';
import Footer from '../Footer';

import '../../css/typography.css';

const defaultPageTitle = 'Calpa\'s Blog';

function Layout({ children }) {
  return (
    <>
      <Helmet
        defaultTitle="Calpa's Website"
        titleTemplate={`%s | ${defaultPageTitle}`}
      >
        <script
          async
          defer
          data-website-id="590ad9a5-cf24-46bc-9c7d-986c36ae15e5"
          src="https://umami-production-6ad8.up.railway.app/umami.js"
          data-domains="calpa.me"
        />
        <link
          rel="stylesheet"
          href="https://unpkg.com/@waline/client@v2/dist/waline.css"
        />
      </Helmet>
      <NavBar />
      <Grid
        sx={{
          backgroundColor: '#f4f4f4',
        }}
      >
        <Grid
          container
          item
          sx={{
            margin: '0 auto',
            maxWidth: 'lg',
            justifyContent: 'center',
          }}
        >
          {children}
        </Grid>
        <Footer />
      </Grid>
    </>
  );
}

export default Layout;

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
