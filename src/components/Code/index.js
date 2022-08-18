import React from 'react';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// prism languages
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';
import python from 'react-syntax-highlighter/dist/esm/languages/prism/python';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml';
import cypher from 'react-syntax-highlighter/dist/esm/languages/prism/cypher'

import { solarizedlight as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography } from '@mui/material';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('json', json);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('bash', bash);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('cypher', cypher)

function Code ({ className = '', children }) {
    if (className) {
        const language = className.replace('lang-', '');

        return (
            <SyntaxHighlighter
                language={language}
                style={style}
            >
                {children}
            </SyntaxHighlighter>
        );
    }

    return (
        <Typography
            sx={{
                display: 'inline-block',
                fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                backgroundColor: 'rgb(253, 246, 227)',
                color: 'rgb(181, 137, 0)',
                padding: '0 2px'
            }}
        >
            {children}
        </Typography>
    );
}

export default Code;
