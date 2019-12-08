import React, { Component } from 'react';

function Welcome1(props){
    return <div>Welcome1, {props.name} - {props.age} </div>;
}

class Welcome2 extends Component {
    render(){
        return <div>Welcome2, {this.props.name} - {this.props.age} </div>
    }
}

export default function CompType(){
    return (
        <div>
            <Welcome1 name="tom" age="12" />
            <Welcome2 name="jerry" age="17" />
        </div>
    )
}

