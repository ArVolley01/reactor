import React from "react";

function OptionBox (props) {
    return (
        <div style={props.style}>
            <p>test</p>
            {props.children}
        </div>
    )
}

export default OptionBox;