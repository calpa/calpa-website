import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

// components
import NavBar from '../NavBar';
import Footer from '../Footer';

import '../../css/typography.css';

const defaultPageTitle = 'Calpa\'s Blog';

function Layout({ pageTitle = defaultPageTitle, children }) {
  return (
    <>
      <Helmet
        defaultTitle="Calpa's Website"
        titleTemplate={'%s | Calpa\'s Website'}
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
        container
        xs={12}
        sx={{
          backgroundColor: '#f4f4f4',
          // minHeight: '100vh',
        }}
      >
        {children}

        <Footer />
      </Grid>
    </>
  );
}

export default Layout;

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};
