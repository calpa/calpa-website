const React = require('react');
const { CacheProvider } = require("@emotion/react");
const createCache = require('@emotion/cache').default;

const cache = createCache({
    "key": "cx"
});

// Wraps every page in a component
exports.wrapPageElement = ({ element }) => {
    return (
        <CacheProvider value={cache}>
            {element}
        </CacheProvider>
    )
}

export { }