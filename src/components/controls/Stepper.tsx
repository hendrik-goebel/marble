interface StepperProps {
  title: string;
  value: number;
  set: (value: number) => void;
  plus: (value: number) => number;
  minus: (value: number) => number;
  plusplus: (value: number) => number;
  minusminus: (value: number) => number;
}

function Stepper({title, value, set, plus, minus, plusplus, minusminus}: StepperProps) {

  if (plusplus && minusminus) {
    return (
      <div>
        <label>{title}</label>
        <button onClick={() => set(plusplus(value))}>&nbsp;++&nbsp;</button>
        <button onClick={() => set(plus(value))}>&nbsp;+&nbsp;</button>
        <span>{value}</span>
        <button onClick={() => set(minus(value))}>&nbsp;-&nbsp;</button>
        <button onClick={() => set(minusminus(value))}>&nbsp;--&nbsp;</button>
      </div>
    );
  }
  return (
    <div>
      <label>{title}</label>
      <button onClick={() => set(plus(value))}>&nbsp;+&nbsp;</button>
      <span>{value}</span>
      <button onClick={() => set(minus(value))}>&nbsp;-&nbsp;</button>
    </div>
  );
}

export default Stepper;


