import React from 'react';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

// prism languages
// https://github.com/react-syntax-highlighter/react-syntax-highlighter/blob/master/AVAILABLE_LANGUAGES_PRISM.MD
import { javascript, jsx, json, python, bash, yaml, cypher, typescript, tsx } from 'react-syntax-highlighter/dist/esm/languages/prism/';

import { solarizedlight as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Typography } from '@mui/material';

SyntaxHighlighter.registerLanguage('js', javascript);
SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('jsx', jsx);

SyntaxHighlighter.registerLanguage('typescript', typescript);
SyntaxHighlighter.registerLanguage('ts', typescript);
SyntaxHighlighter.registerLanguage('tsx', tsx);

SyntaxHighlighter.registerLanguage('json', json);
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
            component="span"
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
