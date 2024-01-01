import './App.css';
import {useState} from "react";
import {default as SpeedStepper} from './components/Stepper';
import {default as PulseCheckbox} from './components/Checkbox';
import {default as PlayButton} from './components/Button';
import Canvas from './components/Canvas';
import setup from "./lib/Setup";

function App() {

  let [bpm, setBpm] = useState(setup.system.audio.bpm);
  let [isPulseEnabled, setPulseEnabled] = useState(true);
  let [isPlaying, setPlaying] = useState(false);

  let inc10 = (value) => value + 10;
  let dec10 = (value) => value - 10;

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-4 bg-slate-400">
          <div>01</div>
          <div><SpeedStepper title="BPM" value={bpm} set={setBpm} plusplus={inc10} minusminus={dec10} /></div>
          <div><PulseCheckbox title="Pulse" value={isPulseEnabled} set={setPulseEnabled}/></div>
          <div><PlayButton title="PLAY" value={isPlaying} set={setPlaying}/></div>
          <div>05</div>
          <div className="col-span-5 bg-slate-400">
            <Canvas bpm={bpm} isPlaying={isPlaying}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
