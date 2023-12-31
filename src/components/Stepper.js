function Stepper({title, value, set, plusplus, minusminus}) {

  if (!plusplus) {
     plusplus = (value) => value * 2;
  }

  if (!minusminus) {
    minusminus = (value) => Math.floor(value / 2);
  }

  let biginc = () => set(plusplus(value));
  let inc = () => set(value + 1);
  let dec = () => value > 0 ? set(value - 1) : null;
  let bigdec = () => set(minusminus(value));

  return (
    <div>
      <label>{title}</label>
      <button onClick={biginc}>++</button>
      <button onClick={inc}>+</button>
      <span>{value}</span>
      <button onClick={dec}>-</button>
      <button onClick={bigdec}>--</button>
    </div>
  );
}

export default Stepper;


