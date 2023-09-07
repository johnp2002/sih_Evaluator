import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Evaulator from './Evaulator';
import check from './check';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' exact Component={App} />
        <Route path='/evaluator' exact Component={Evaulator} />
        {/* <App /> */}
      </Routes>
    </Router>
  </React.StrictMode>
);