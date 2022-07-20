import './App.css';
import OptionBox from "./OptionBox";

function App() {
  return (
    <div className='App'>
      <video autoPlay muted loop id="background-video">
        <source src="clouds3.mp4" type="video/mp4"/>
      </video>
      <header>Reactor</header>
      <hr></hr>
      <div id="option-menu">
        <OptionBox style={{display: "grid", height:"250px", width:'250px', marginLeft: "50px", borderStyle: "solid"}}>
          <OptionBox style={{ height: "50px", width: '50px', borderStyle: "solid" }} />
          <OptionBox style={{ height: "50px", width: '50px', borderStyle: "solid" }} />
          <OptionBox style={{ height: "50px", width: '50px', borderStyle: "solid" }} />
          <OptionBox style={{ height: "50px", width: '50px', borderStyle: "solid" }} />
        </OptionBox>
      </div>
    </div>
  );
}

export default App;
