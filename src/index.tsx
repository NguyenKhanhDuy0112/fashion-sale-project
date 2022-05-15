import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'react-loading-skeleton/dist/skeleton.css'
import 'react-quill/dist/quill.snow.css';

import "bootstrap/dist/css/bootstrap.css"
import './view/styles/index.scss';

import { Provider } from 'react-redux';
import store from "./core/store"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
