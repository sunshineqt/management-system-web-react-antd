import React from 'react';
// import logo from './logo.svg';
import './App.css';

// import CompType from './components/CompType';
// import StateTest from './components/StateTest';
// import CartSample from './components/CartSample';
// import CommentList from './components/CommentList';
// import Hoc from './components/Hoc';
// import Composition from './components/Composition';
import ContextTest from './components/ContextTest';
import HookTest from './components/HookTest';

// 按需导入
// import { Button } from 'antd';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*<img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>*/}
        {/* <CompType /> */}
        {/* <StateTest /> */}
        {/* <CartSample /> */}
        {/* <Button type="primary">测试btn</Button> */}
        {/* <CommentList /> */}
        {/* <Hoc name="hoc" /> */}
        {/* <Composition /> */}
        <ContextTest />
        <HookTest />
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
