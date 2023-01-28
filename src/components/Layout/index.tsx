import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@mui/material';
import { Helmet } from 'react-helmet';

// components
import { Footer, NavBar } from '@calpa/ui';

import '../../css/typography.css';
import { navigate } from 'gatsby';

const defaultPageTitle = 'Calpa\'s Blog';

enum Pages {
  "Guest Book",
  "About",
  "Tags"
}

// Helper
function StringIsNumber(value: string | number) {
  return isNaN(Number(value)) === false;
}

// Turn enum into array
function enumToArray(enumme: any): string[] {
  return Object.keys(enumme)
    .filter(StringIsNumber)
    .map(key => enumme[key]);
}

function Layout({ children }) {
  return (
    <>
      <Helmet
        defaultTitle="Calpa's Website"
        titleTemplate={`%s | ${defaultPageTitle}`}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/@waline/client@v2/dist/waline.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Helmet>
      <NavBar
        color="default"
        title="HOME"
        pages={enumToArray(Pages)}
        avatarImage="https://i.imgur.com/F2HnBGC.png"
        avatarAlt='Nyahello'
        handleTitleClick={() => navigate("/")}
        onClick={(event) => {
          event.preventDefault();
          let innerText: string | undefined = event.target.innerText;
          if (!innerText) {
            return;
          }
          innerText = innerText.toLowerCase();

          if (innerText === 'guest book') {
            navigate('/blog/guestbook/');
          } else if (innerText === 'about') {
            navigate('/blog/about/');
          } else if (innerText === 'tags') {
            navigate('/blog/tags/');
          }
        }}
      />
      <Grid
        sx={{
          backgroundColor: '#f4f4f4',
          paddingTop: `56px`,
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
        <Footer
          about="Build With Love and Peace"
          categories={[]}
          quickLinks={[
            {
              title: "Github Page",
              link: `https://github.com/calpa/`
            }
          ]}
        />
      </Grid>
    </>
  );
}

export default Layout;

