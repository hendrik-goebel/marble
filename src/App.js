import './App.css';
import {useState} from "react";
import {default as SpeedStepper} from './components/Stepper';
import {default as PulseCheckbox} from './components/Checkbox';
import {default as PlayButton} from './components/Button';
import Canvas from './components/Canvas';
import {useSelector, useDispatch}  from "react-redux";
import {setBpm as dispatchSetBpm, setPlaying as dispatchPlaying, setPulseEnabled} from "./lib/state/controlSlice";
import setup from "./lib/Setup";

function App() {

  let [isPulseEnabled, setPulseEnabled] = useState(true);

  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.control.isPlaying);
  const bpm = useSelector((state) => state.control.bpm);
  const setIsPlaying = (state) => dispatch(dispatchPlaying(state));
  const setBpm = (state) => dispatch(dispatchSetBpm(state));
  let inc10 = (value) => value + 10;
  let dec10 = (value) => value - 10;

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-4 bg-slate-400">
          <div>01</div>
          <div><SpeedStepper title="BPM" value={bpm} set={setBpm} plusplus={inc10} minusminus={dec10} /></div>
          <div><PulseCheckbox title="Pulse" value={isPulseEnabled} set={setPulseEnabled}/></div>
          <div><PlayButton title="PLAY" value={isPlaying} set={setIsPlaying}/></div>
          <div>05</div>
          <div className="col-span-5 bg-slate-400">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
