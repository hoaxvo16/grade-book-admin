import { Authentication } from 'container';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <Authentication>
            <App />
         </Authentication>
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);
