import React from 'react';
import logo from './logo.svg';
import './App.css';
import {SyntaxHighlightingTextarea} from './SyntaxHighlightingTextarea';

function App() {
  return (
      <SyntaxHighlightingTextarea style={{width: '100vw', height: '100vh'}} highlightOptions={{language: 'js'}}/>
  );
}

export default App;
