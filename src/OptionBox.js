import React from "react";

function OptionBox (props) {
    return (
        <div style={props.style}>
            {props.text ? <p>props.text</p> : null}
            {props.children}
        </div>
    )
}

export default OptionBox;