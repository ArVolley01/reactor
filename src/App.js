import './App.css';
import GameState from './GameState';

const App = () => {
  return (<GameState initShop={[0, 0]} initTask={[0, 1]}/>);
}

export default App;
