// Hooks
import React, { useState, useEffect, useReducer, useContext } from "react";

function FruitList({ fruits, setFruit }) {
  return (
    // {
    fruits.map(f => (
      <li key={f} onClick={() => setFruit(f)}>
        {f}
      </li>
    ))
    // }
  );
}

function FruitAdd(props) {
  const [pname, setPname] = useState("");
  const { dispatch } = useContext(Context);
  const onAddFruit = e => {
    if (e.key === "Enter") {
      // props.onAddFruit(pname);
      dispatch({ type: "add", payload: pname });
      setPname("");
    }
  };
  return (
    <div>
      <input
        type="text"
        value={pname}
        onChange={e => setPname(e.target.value)}
        onKeyDown={onAddFruit}
      />
    </div>
  );
}

// 将状态移至全局
function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}

// 创建上下文
const Context = React.createContext();

export default function HookTest() {
  // useState参数是状态初始值，
  // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
  const [fruit, setFruit] = useState("草莓");
  // const [fruits, setFruits] = useState([])
  // 从外部取值，参数1是相关reducer（类似vuex中到mutation，接收action，改变state状态）参数2是初始值
  const [fruits, dispatch] = useReducer(fruitReducer, []);

  // const [fruits, setFruits] = useState(['草莓','香蕉'])
  // 使用use2Effect操作副作用
  // 必须设置依赖选项，如果没有则设置空数组表示仅执行一次
  useEffect(() => {
    setTimeout(() => {
      // setFruits(['草莓','香蕉'])
      dispatch({ type: "init", payload: ["草莓", "香蕉"] });
    }, 1000);
  }, []);

  useEffect(() => {
    document.title = fruit;
  }, [fruit]);

  return (
    <Context.Provider values={{fruits, dispatch}}>
      <div>
        <p>{fruit === "" ? "清选择喜爱的水果" : `您选择的是${fruit}`}</p>
        {/* <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} /> */}
        {/* <FruitAdd
          onAddFruit={pname => dispatch({ type: "add", payload: pname })}
        /> */}
        <FruitAdd />
        <FruitList fruits={fruits} setFruit={setFruit} />
      </div>
    </Context.Provider>
  );
}
