import GameElement from "./GameElement";

class ShopItem extends GameElement {
    constructor(props) {
        super(props)
        this.name = "buy"
        this.cost = props.cost ? props.cost : 0
    }
}

export default ShopItem;