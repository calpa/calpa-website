module.exports = {
  graphqlTypegen: true,
  siteMetadata: {
    title: 'Calpa Website',
    siteUrl: 'https://calpa.me/',
  },
  plugins: ['gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.jpeg',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/src/content`,
        fastHash: true,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'noun',
        path: `${__dirname}/src/nouns`,
        fastHash: true,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          `G-7JZ70YDETC`
        ]
      }
    },
    'gatsby-plugin-pnpm',
    'gatsby-transformer-remark',
    'gatsby-theme-material-ui',
    'gatsby-plugin-netlify',
  ],
};
