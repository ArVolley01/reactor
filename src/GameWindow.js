
import OptionBox from "./OptionBox";

const GameWindow = (props) => {
    return (
        <div id={props.name}>
            <p>{props.name.slice(0,1).toUpperCase() + props.name.slice(1)}
                {props.points ? ` (Points: ${props.points})` : null} 
                {props.power ? ` (Power: ${props.power})` : null} </p>
            <OptionBox style={
                { 
                    placeContent: "center", 
                    placeItems: "center", 
                    display: "grid", 
                    gridTemplateColumns: "80px 80px 80px 80px 80px", 
                    gridTemplateRows: "80px 80px 80px 80px 80px", 
                    height: "420px", 
                    width: '420px', 
                    marginTop: "60px", 
                    borderStyle: "solid" 
                }}>
                {props.children}
            </OptionBox>
        </div>
    )
}

export default GameWindow;