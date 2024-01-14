import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import Store from './store';
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import  AlertTemplate  from 'react-alert-template-basic';

const options = {  
  timeout:5000,
  positions:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
    <AlertProvider template = {AlertTemplate} {...options} >
    <App />
    </AlertProvider>
    </Provider>
  </React.StrictMode>
);

