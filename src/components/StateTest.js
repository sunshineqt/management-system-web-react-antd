import React, { Component } from 'react';

class Clock extends Component {
    constructor(props){
        super(props)
        this.state = { 
            date: new Date(),
            counter:1
         }
    }
    componentDidMount(){
       this.timer = setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000)
        this.setState({counter: this.state.counter + 1 })
        this.setState({counter: this.state.counter + 1 })
        this.setState({counter: this.state.counter + 1 })
        console.log(this.state.counter); // 1 还未更新

        // 回调方式
        this.setState((nextState) => {
            console.log(nextState.counter) // 2 回调里可以拿到最新的
        })

        // 定时器方式，与事件循环有关
        setTimeout(() => {
            console.log(this.state.counter) // 2 可以拿到最新的
        },0)

        // 原生事件
        document.body.addEventListener('click', this.changeCounter);

    }
    // react造了个事件系统，利用原生事件及跳过了react事件系统，行为变为同步操作
    changeCounter = () => {
        // 箭头函数为了保持this指向
        console.log(this.state.counter);
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render(){
        return (
            <div>
                {this.state.date.toLocaleTimeString()}
            </div>
        )
    }

}

export default class StateTest extends Component {
    render(){
        return (
            <div>
                <Clock />
            </div>
        )
    }
}