import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {store} from '../src/app/store/Store';
import {Provider} from "react-redux";

import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  // <React.StrictMode>
    <Provider store={store}>
        <App />
          <ToastContainer
              autoClose={4000}
              newestOnTop={true}
              closeOnClick={true}
              draggable={true}
              pauseOnHover={false}
              style={{paddingTop: "80px"}}
          />
    </Provider>
  // </React.StrictMode>
);



;
