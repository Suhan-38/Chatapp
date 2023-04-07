import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Mycontext from './Mycontext';
import { ChatContextProvider } from './ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Mycontext>
        <ChatContextProvider><App /></ChatContextProvider>
    </Mycontext>
);
