function Stepper({title, value, set, plus, minus, plusplus, minusminus}) {

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


