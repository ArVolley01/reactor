import React from "react";
import GameWindow from "./GameWindow";
import OptionBox from "./OptionBox";
import ShopItem from "./Elements/ShopItem";
import Task from "./Elements/Task";
import Coder from "./Elements/Coder"
import userEvent from "@testing-library/user-event";

const turnMax = 75

const addCharacter = (character) => {
    return (
        character.rallied 
            ? getBox(character.effect, character.name, character.blurb, character.description, character)
            : getBox(character.rally, `Rally ${character.name}`, "Read Abilites", character.description, character)
    )
}

const addShop = (shopItem) => {
    return (getBox(shopItem.effect, `${shopItem.cost} Pts`, shopItem.blurb, shopItem.description, shopItem))
}

const addTask = (task) => {
    return (getBox(task.effect, `${task.power} Pow`, task.blurb, task.description, task))
}

const getBox = (buttonFunction, buttonDisplay, concise, verbose, ref) => {
    return (
        <OptionBox style={{ overflow: "auto", fontSize: "0.3em", height: "70px", width: '70px', borderStyle: "solid" }}>
            <button onClick={() => buttonFunction(ref)}>{buttonDisplay}</button>
            <p
                onClick={() => {
                    document.getElementById("description").textContent = verbose;
                }}> {concise}
            </p>
            {ref ? ref.power ? 
            <p onClick = { () => {
                document.getElementById("description").textContent = `Power, gained from coders, is used to complete tasks`;
            }}>
                Power: {ref.power}
            </p> : null : null}
            {ref ? ref.timer ? 
            <p onClick = { () => {
                    document.getElementById("description").textContent = `If failed: ${ref.failtext}`;
            }}>
                Time Left: {ref.timer}
            </p> : null : null}
        </OptionBox>
    );
}

class GameState extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            initShop: props.initShop,
            shop: [],
            initTask: props.initTask, 
            tasks: [],
            points: 2,
            power: 10,
            turn: 1,
        }
        this.state.coders = this.allCoders
        this.state.friends = 0
        this.state.initShop.forEach((element) => {
            this.state.shop.push(new ShopItem(this.allShop[element]))
        })
        this.state.initTask.forEach((element) => {
            this.state.tasks.push(new Task(this.allTasks[element]))
        })
    }

    allCoders = [
        new Coder({
            name: "Michael",
            blurb: "Drill (A), Health & Wellness (R)",
            // eslint-disable-next-line no-multi-str
            description: "Drill (Active): \
                    Adds 1 Drill tasks which give points when completed. \
                    Health and Wellness (On Rally): When rallied, adds 'skip lunch' to the shop.",
            power: 0,
            effect: () => {
                this.setState({
                    tasks: [...this.state.tasks, new Task(this.allTasks[1])]
                })
            },
            rally: (input) => {
                input.rallied = true
                this.setState({friends: this.state.friends + 1, shop: this.state.shop.concat(new ShopItem(this.allShop[0]))})
            }
        }),
        new Coder({
            name: "Ashwin",
            blurb: "Diagnose (A)",
            description: "Diagnose (Active): Remove up to 3 bugs from random friendly coders",
            power: 9,
            effect: (input) => { this.setState({ power: this.state.power + input.power }) },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
        new Coder({
            name: "Nick",
            blurb: "Breakdown Concept (A/O)",
            description: "Breakdown Concept (Active: Optional): Spend 5 power to permanently increase the power of the first ally with lower power by 2 (does not apply to coders with power 0)",
            power: 7,
            effect: (input) => {
                if (window.confirm("Use Breakdown Concept?")) {
                    this.setState({ 
                        power: this.state.power + input.power - 5,
                        coders: this.state.coders
                    })
                } else {
                    this.setState({ power: this.state.power + input.power })
                }
            },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
        new Coder({
            name: "Antonio",
            blurb: "Antonio",
            description: "Antonio's Ability",
            power: 0,
            effect: () => { console.log("Antonio Ability", this.state) },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
        new Coder({
            name: "Tomer",
            blurb: "MONSTER CODER (P)",
            description: "MONSTER CODER (Passive): Increases Base Power by 50% (to 12)",
            power: 12,
            effect: (input) => { this.setState({ power: this.state.power + input.power }) },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
        new Coder({
            name: "Zach",
            blurb: "Distraction (A/O)",
            description: "Reduces power output this turn, but improves mental health",
            power: 5,
            effect: (input) => { this.setState({ power: this.state.power + input.power }) },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
        new Coder({
            name: "Mark",
            blurb: "MONSTER CODER (P)",
            description: "MONSTER CODER (Passive): Increases Base Power by 50% (to 12)",
            power: 12,
            effect: (input) => { this.setState({ power: this.state.power + input.power }) },
            rally: (input) => {
                input.rallied = true
                this.setState({ friends: this.state.friends + 1 })
            }
        }),
    ]

    allShop = [
        {
            blurb: "Skip Lunch",
            description: "Increases this turn's code output by 5 for each coder.",
            cost: 1,
            effect: (input) => {
                console.log(input)
                if (this.state.points >= input.cost) {
                    this.setState({
                        shop: this.state.shop.filter((element) => { return element !== input }),
                        points: this.state.points - input.cost,
                        power: this.state.power + 5 * this.state.friends
                    })
                } else {
                    alert("Not enough points!")
                }
            },
        }
    ]

    allTasks = [
        {
            blurb: "Basic Lab",
            description: "When completed, gain 2 points",
            timer: 2,
            power: 10,
            effect: (input) => {
                if (this.state.power >= input.power) {
                    this.setState({
                        tasks: this.state.tasks.filter((element) => { return element !== input }),
                        power: this.state.power - input.power,
                        points: this.state.points + 2
                    })
                } else {
                    alert("Not enough power!")
                }
            }
        },
        {
            blurb: "Drill",
            description: "When completed, gain 2 points",
            timer: 1,
            power: 5,
            effect: (input) => {
                if (this.state.power >= input.power) {
                    this.setState({
                        tasks: this.state.tasks.filter((element) => { return element !== input }),
                        power: this.state.power - input.power,
                        points: this.state.points + 2
                    })
                } else {
                    alert("Not enough power!")
                }
            }
        },
    ]

    turn() {
        this.setState({
            turn: this.state.turn + 1,
            tasks: this.state.tasks.filter( (element) => {
                element.timer -= 1;
                if (element.timer === 0) {
                    element.fail()
                    return false;
                } else {
                    return true;
                }
            })
        })
    }

    render() {
        return (
            <div className='All'>
                <video autoPlay muted loop id="background-video">
                    <source src="clouds3.mp4" type="video/mp4" />
                </video>
                <header>Reactor</header>
                <hr></hr>
                <div id="game-area" style={{ display: "inline-flex", width: "100vw", justifyContent: "space-around" }}>
                    <GameWindow name="coders" power={this.state.power}>
                        {this.allCoders.map((element) => addCharacter(element))}
                    </GameWindow>
                    <GameWindow name="shop" points={this.state.points}>
                        {
                        this.state.shop.map((element) => {return addShop(element)})
                        }
                    </GameWindow>
                    <GameWindow name="tasks">
                        {
                        this.state.tasks.map((element) => {return addTask(element)})
                        }
                    </GameWindow>
                </div>
                <hr />
                <div id="description-area">
                    <p id="description" style={{ overflow: "auto" }}>Click the small text to see a detailed description here</p>
                </div>
                <hr/>
                <div style={{ display: "inline-flex", width: "90vw", justifyContent: "space-evenly" }}>
                    <p>Turn {this.state.turn}</p>
                    <p>Turns Remaining: {turnMax - this.state.turn}</p>
                    <button onClick={() => {this.turn()}}>End Turn</button>
                </div>
            </div>
        );
    }
}

export default GameState;