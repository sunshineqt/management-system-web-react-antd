import React from 'react';

function Kkb(props){
    return (
        <div>
            {props.stage} - {props.name}
        </div>
    )
}

// const withKkb = (Component) => {
//     const NewComponent = (props) => {
//         return <Component {...props} name='高阶组件' />
//     };
//     return NewComponent;
// }

// 高阶组件，创建一个函数接收一个组件返回另一个组件
function withStage(Component){
    const NewComponent = (props) => {
        return <Component {...props} stage='react' />
    };
    return NewComponent;
}

// 功能：日志记录
function withLog(Component){
    console.log(Component.name + '加强了');
    return props => {
        return <Component {...props} />
    }
}

// 对Kkb进行包装
// export default withStage(Kkb);
export default withLog(withStage(withLog(Kkb)));