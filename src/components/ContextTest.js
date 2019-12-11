import React, { Component } from "react";

// 创建上下文
const Context = React.createContext();
const store = {
  token: "kk"
};

export default class ContextTest extends Component {
  render() {
    return (
      <Context.Provider value={store}>
        <div>
            <Context.Consumer>
                {value => <p>{value.token}</p>}
            </Context.Consumer>
        </div>
      </Context.Provider>
    );
  }
}
