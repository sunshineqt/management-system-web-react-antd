import React, {Component} from 'react';

function Dialog(props){
    const color = props.color || 'blue';
    return (
        <div style={{border:"2px solid blue", color:color}}>
        {/* 类似匿名slot children-合法的js表达式 */}
            {props.children}
            <div>
                {/* 类似作用域slot */}
                {props.foo('该内容来自dialog')}
            </div>
            <div>
            {/* 类似具名slot */}
                {props.footer}
            </div>
        </div>
    )
}

// WelcomeDialog通过复合提供内容
function WelcomeDialog(){
    const footer = <button onClick={()=>alert('ok')}>ok</button>
    return (
        <Dialog color="red" footer={footer} foo={c=><p>{c}</p>}>
            <h1>欢迎</h1>
            <p>感谢使用react</p>
        </Dialog>
    )
}

// 过滤，只留某个元素标签
function FilterP(props){
    return <div>
        {React.Children.map(props.children, child => {
            console.log(child,'child');
            if(child.type != 'p'){
                return ;
            }
            return child;
        })}
    </div>
}

function RadioGroup(props){
    // 将name属性赋值给所有radio
    return (
        // {
            React.Children.map( props.children, child => React.cloneElement(child, {name: props.name}))
        // }
    )
}

function Radio(props){
    return (
        <label htmlFor="">
            <input type="radio" name={props.name} />
            {props.children}
        </label>
    )
}

/* export default function Composition(){
    return <WelcomeDialog />
} */
export default function Composition(){
    return (
        <div>
            <WelcomeDialog />
            <FilterP>
                <h1>foo</h1>
                <p>bar</p>
                <h1>ces</h1>
                <p>kklkkk</p>
            </FilterP>

            <RadioGroup name="mvvm">
                <Radio name="vue">vue</Radio>
                <Radio name="react">react</Radio>
                <Radio name="angular">angular</Radio>
            </RadioGroup>

        </div> 

    )
}