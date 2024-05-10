import React from "react";
import {default as SpeedStepper} from './controls/Stepper';
import {useAppDispatch, useAppSelector} from "../lib/store/hooks";
import {selectBpm, setBpm as setBpmAction} from "../lib/store/controlsSlice";

function ControlsBar () {
  const dispatch = useAppDispatch();
  const setBpm = (state: number) => dispatch(setBpmAction(state));
  const bpm = useAppSelector(selectBpm);

  return (
    <div className="grid grid-cols-6 gap-4 bg-slate-400">
      <div>
        <SpeedStepper
          title="BPM"
          value={bpm}
          set={setBpm}
          plus={(value: number) => {
            return value + 1
          }}
          minus={(value: number) => {
            return value - 1
          }}
          plusplus={(value: number) => {
            return value + 10
          }}
          minusminus={(value: number) => {
            return value - 10
          }}/>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>


    </div>
  );
}

export default ControlsBar