import * as React from "react";

const { forwardRef } = React;

function YY(props) {
    return <div>123</div>;
}

function XXX(props, ref) {
    return <YY ref={ref}>hello</YY>;
}

const XXXR = forwardRef(XXX);

export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        console.log("ref", this.myRef);
    }
    render() {
        return (
            <div>
                <XXXR ref={this.myRef} />
                <button onClick={this.handleClick}>aaaa</button>
            </div>
        );
    }
}
