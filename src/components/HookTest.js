// Hooks
import React, { useState, useEffect, useReducer, useContext } from "react";
import { connect } from "react-redux";
// import {loadingStart, loadingEnd, init, asyncFetch} from '../store';
import { BrowserRouter, Link, Route, Redirect, Switch } from "react-router-dom";
import { login } from "../store/user.redux";
import { asyncFetch } from "../store/fruit.redux";

function FruitList({ fruits, setFruit }) {
    return ( <
        div >
        <
        ul > {
            fruits.map(f => ( <
                li key = { f }
                onClick = {
                    () => setFruit(f) } >
                <
                Link to = { `/list/detail/${f}` } > { f } < /Link> <
                /li>
            ))
        } <
        /ul> { /* 嵌套路由 */ } <
        Route path = "/list/detail/:fruit"
        component = { Detail } > < /Route> <
        /div>
    );
}

const FruitAdd = connect()(function({ dispatch }) {
    const [pname, setPname] = useState("");

    const onAddFruit = e => {
        if (e.key === "Enter") {
            // props.onAddFruit(pname);
            dispatch({ type: "add", payload: pname });
            setPname("");
        }
    };
    return ( <
        div >
        <
        input type = "text"
        value = { pname }
        onChange = { e => setPname(e.target.value) }
        onKeyDown = { onAddFruit }
        /> <
        /div>
    );
});

function Detail({ match, history, location }) {
    console.log(match, history, location);
    return ( <
        div >
        <
        h3 > { match.params.fruit }
        的详情 < /h3> <
        p > ... < /p> <
        div >
        <
        button onClick = { history.goBack } > 返回 < /button> <
        /div> <
        /div>
    );
}
// 创建高阶组件包装Route组件使其可以验证用户登录态
const PrivateRoute = connect(
    state => ({
        isLogin: state.user.isLogin
    }), { login }
)(function PrivateRoute({ component: Component, isLogin, ...rest }) {
    // 结构props为component和rest
    // rest为传递给Route丢属性
    return ( <
        Route {...rest }
        render = {
            // 执行登录判断逻辑从而动态生成组件
            props =>
            isLogin ? ( <
                Component {...props }
                />
            ) : ( <
                Redirect to = {
                    {
                        pathname: "/login",
                        state: { redirect: props.location.pathname }
                    }
                }
                />
            )
        } >
        < /Route>
    );
});
const Login = connect(
    state => ({
        isLogin: state.user.isLogin
    }), { login }
)(function Login({ location, isLogin, login }) {
    const redirect = location.state.redirect || "";
    if (isLogin) return <Redirect to = { redirect }
    />;
    return ( <
        div >
        <
        p > 用户登录 < /p> <
        hr / >
        <
        button onClick = {
            () => login('aaaa') } > 登录 < /button> <
        /div>
    );
});

const mapStateToProps = state => ({
    fruits: state.fruit.list,
    loading: state.fruit.loading
});
const mapDispatchToProps = {
    // loadingStart, loadingEnd, init,
    asyncFetch
};

function HookTest({
    fruits,
    loading,
    loadingStart,
    loadingEnd,
    init,
    asyncFetch
}) {
    // useState参数是状态初始值，
    // 返回一个数组，第一个元素是状态变量，第二个元素是状态变更函数
    const [fruit, setFruit] = useState("草莓");
    // const [fruits, setFruits] = useState([])
    // 从外部取值，参数1是相关reducer（类似vuex中到mutation，接收action，改变state状态）参数2是初始值
    // const [fruits, dispatch] = useReducer(fruitReducer, []);
    // const [{list:fruits, loading}, originDispatch ] = useReducer(fruitReducer);

    // const [fruits, setFruits] = useState(['草莓','香蕉'])
    // 使用use2Effect操作副作用
    // 必须设置依赖选项，如果没有则设置空数组表示仅执行一次
    useEffect(() => {
        asyncFetch(["草莓", "香蕉"]);
        // loadingStart();
        // setTimeout(() => {
        //   // setFruits(['草莓','香蕉'])
        //   // dispatch({ type: "init", payload: ["草莓", "香蕉"] });
        //   loadingEnd();
        //   init(['草莓','香蕉'])
        // }, 1000);
    }, []);

    useEffect(() => {
        document.title = fruit;
    }, [fruit]);

    return ( <
        BrowserRouter >
        <
        nav >
        <
        Link to = "/" > 水果列表 < /Link> <
        Link to = "/add" > 添加水果 < /Link> <
        /nav> <
        div > { /* exact */ } <
        Switch >
        <
        Route path = "/list"
        render = {
            props =>
            loading ? ( <
                div > 数据加载中...... < /div>
            ) : ( <
                FruitList fruits = { fruits }
                setFruit = { setFruit }
                />
            )
        } >
        < /Route> { /* <Route path="/add" component={FruitAdd}></Route> */ } <
        PrivateRoute path = "/add"
        component = { FruitAdd }
        /> <
        Route path = "/login"
        component = { Login }
        /> <
        Route component = {
            () => < h3 > 页面跑丢了 < /h3>}></Route > { /* <Route path="/detail/:fruit" component={Detail}></Route> */ } { /* <Redirect></Redirect> */ } <
            /Switch> <
            /div> { /* <p>{fruit === "" ? "清选择喜爱的水果" : `您选择的是${fruit}`}</p> */ } { /* <FruitAdd onAddFruit={pname => setFruits([...fruits, pname])} /> */ } {
                /* <FruitAdd
                          onAddFruit={pname => dispatch({ type: "add", payload: pname })}
                        /> 
                        <FruitAdd />*/
            } { /* <FruitList fruits={fruits} setFruit={setFruit} /> */ } <
            /BrowserRouter>
        );
    }

    export default connect(mapStateToProps, mapDispatchToProps)(HookTest);