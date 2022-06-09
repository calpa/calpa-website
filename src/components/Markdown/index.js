import React from 'react';
import ReactMarkdown from 'markdown-to-jsx';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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
  },
};

export default function Markdown(props) {
  return <ReactMarkdown options={options} {...props} />;
}
