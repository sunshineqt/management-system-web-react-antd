import React, { Component } from "react";

// 子组件
function Cart(props) {
    //  此处的onçlick函数是调用父组件的函数，用于向父组件传参 
  return (
    <div>
      <table>
        <tbody>
          {props.data.map(d => (
            <tr key={d.text} onClick={() => props.onSelect(d.text)}>
              <td>{d.text}</td>
              <td>{d.count}</td>
              <td>{d.price * d.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// 父组件
export default class CartSample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "ceshi",
      showTitle: true,
      title: "阳光正好",
      goods: [
        {
          text: "你猜",
          price: 100,
          id: 1
        },
        {
          text: "你猜你猜",
          price: 200,
          id: 2
        },
        {
          text: "你猜你再猜",
          price: 300,
          id: 3
        }
      ],
      cart:[]
    };
    setTimeout(() => {
      this.setState({
        showTitle: false
      });
    }, 1000);
  }
  // 注意this要指向当前实例而非input
  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  addGood = () => {
    this.setState({
      goods: [
        ...this.state.goods,
        { text: this.state.name, price: 33, id: Math.random() * 100 }
      ]
    });
  };
  addCart = (good) =>{
    const item = this.state.cart.find(c => c.text === good.text);
    if(item){
        item.count += 1;
        this.setState({cart: [...this.state.cart]})
    }else{
        this.setState({cart: [...this.state.cart, {...good, count:1}]})
    }
  }
  // 子父通信,父接收子传过来的参数
  onSelect = name =>{
      console.log(name)
  }
  render() {
    const goods = this.state.goods.map(good => (
      <li key={good.id}>
        {good.text}
        <button onClick={() => this.addCart(good)}>加购</button>
      </li>
    ));
    return (
      <div>
        {/* 条件语句 */}
        {this.state.title && <h1>{this.state.title}</h1>}
        {/* 事件处理 */}
        {/* react单向数据流 */}
        <div>
          <input
            type="text"
            value={this.state.name}
            onChange={e => this.handleChange(e)}
            // onChange = {this.handleChange}
          />
          <button onClick={e => this.addGood(e)}>添加</button>
        </div>
        {/* 循环 */}
        <ul>{goods}</ul>
        {/* 购物车 */}
        {/* 父元素给子元素传递消息用属性props；子元素想给父元素传递消息用事件 */}
        {/* onSelect为传给子元素的事件名称；this.onSelect为当前组件中用的事件名称 */}
        <Cart data={this.state.cart} onSelect={this.onSelect}></Cart>
      </div>
    );
  }
}
