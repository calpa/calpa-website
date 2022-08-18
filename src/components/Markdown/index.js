import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import { Typography, Grid } from '@mui/material';
import Link from '@mui/material/Link';

import Code from '../Code';

function Wrapper ({ children }) {
  return (
    <Grid
      sx={{
        width: '100%',
      }}
    >
      {children}
    </Grid>
  );
}

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        variant: 'h1',
      },
    },
    h2: { component: Typography, props: { variant: 'h2' } },
    h3: { component: Typography, props: { variant: 'h3' } },
    h4: {
      component: Typography,
      props: { variant: 'h4' },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    code: {
      component: Code,
    },
  },
  wrapper: Wrapper,
};

export default function Markdown (props) {
  return <ReactMarkdown options={options} {...props} />;
}
