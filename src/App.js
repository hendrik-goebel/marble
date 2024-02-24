import './App.css';
import {useState} from "react";
import {default as SpeedStepper} from './components/Stepper';
import {default as PulseCheckbox} from './components/Checkbox';
import {default as PlayButton} from './components/Button';
import {default as QuantisationStepper} from './components/Stepper';

import Canvas from './components/Canvas';
import {useSelector, useDispatch}  from "react-redux";
import {setBpm as dispatchSetBpm, setPlaying as dispatchPlaying, setPulseEnabled, setQuantisation as dispatchSetQuantisation} from "./lib/state/controlSlice";

function App() {
  const dispatch = useDispatch();

  const isPlaying = useSelector((state) => state.control.isPlaying);
  const bpm = useSelector((state) => state.control.bpm);
  const isPulseEnabled = useSelector((state) => state.control.isPulseEnabled);
  const quantisation = useSelector((state) => state.control.quantisation);
  const setIsPlaying = (state) => dispatch(dispatchPlaying(state));
  const setBpm = (state) => dispatch(dispatchSetBpm(state));
  const setIsPulseEnabled = (state) => dispatch(setPulseEnabled(state));
  const setQuantisation = (state) => dispatch(dispatchSetQuantisation(state));

  const inc10 = (value) => value + 10;
  const dec10 = (value) => value - 10;
  const doubleMax32 = (value) => (value * 2 <= 32) ? value * 2 : value;
  const halfMin4 = (value) => (value / 2) < 4 ? value : value / 2;
  const plus = (value) => value + 1;
  const minus = (value) => value - 1;

  return (
    <div className="App">
      <div className="container mx-auto">
        <div className="grid grid-cols-5 gap-4 bg-slate-400">
          <div>01</div>
          <div><SpeedStepper title="BPM" value={bpm} set={setBpm} plus={plus} minus={minus} plusplus={inc10} minusminus={dec10} /></div>
          <div><QuantisationStepper title="Quantisation" value={quantisation} set={setQuantisation} plus={doubleMax32} minus={halfMin4}  /></div>
          <div><PulseCheckbox title="Pulse" value={isPulseEnabled} set={setIsPulseEnabled}/></div>
          <div><PlayButton title="PLAY" value={isPlaying} set={setIsPlaying}/></div>
          <div className="col-span-5 bg-slate-400">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
