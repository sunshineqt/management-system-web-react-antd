import React from 'react';
import logo from './logo.svg';
import './App.css';

import CompType from './components/CompType';
import StateTest from './components/StateTest';
import CartSample from './components/CartSample';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>*/}
        <CompType />
        <StateTest />
        <CartSample />
        {/*<a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>*/}
      </header>
    </div>
  );
}

export default App;
