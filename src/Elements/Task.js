
import GameElement from "./GameElement";

class Task extends GameElement {
    constructor(props) {
        super(props)
        this.timer = props.timer
        this.power = props.power
        this.failtext = props.failtext ? props.failtext : "No Consequence"
        this.fail = props.fail ? props.fail : () => {}
    }
}

export default Task;