import GameElement from "./GameElement";

class Coder extends GameElement {
    constructor(props) {
        super(props)
        this.power = props.power ? props.power : 0
        this.rallied = false
        this.rally = props.rally ? props.rally : () => {}
    }
}

export default Coder;