import React from 'react'
import ReactDOM from 'react-dom'
import {SyntaxHighlightingTextarea} from './SyntaxHighlightingTextarea';
import 'highlight.js/styles/a11y-dark.css'

ReactDOM.render(
    <React.StrictMode>
        <SyntaxHighlightingTextarea highlightOptions={{language: 'js'}}
                                    style={{height: '500px', width: '500px', caretColor: 'white'}}/>
    </React.StrictMode>,
    document.getElementById('root')
);

