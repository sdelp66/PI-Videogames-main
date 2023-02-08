import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom' // estos 3 Browsr, store y provider los traje imitando r&M..
import store from './redux/store';
import { Provider } from 'react-redux'

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>, // hay q usar esto de React.strictmode?? >> aqui voy con lo q usamos en R&M..
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
