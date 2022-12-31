import React from 'react';
import Link from '@mui/material/Link';

const withExternalLink = WrappedComponent => {
    const WithExternalLink = props => {
        // Check if the link is external
        const isExternal = props.href.startsWith('http');
        const wrappedProps = {};

        if (isExternal) {
            wrappedProps.target = '_blank';
            wrappedProps.rel = 'noopener noreferrer';
        }

        return <WrappedComponent {...props} {...wrappedProps} />;
    };

    return WithExternalLink;
};

const CustomLink = withExternalLink(Link);

export default CustomLink;
