import { useState } from "react";

export interface State {
  top: number[];
  topTaken: boolean[];
  bottom: number[];
  bottomTaken: boolean[];
  count: number;
}

const initialState: State = {
  top: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  topTaken: [false, true, false, false, false, false, false, false, false],
  bottom: [9, 8, 7, 6, 5, 4, 3, 2, 1],
  bottomTaken: [false, false, false, false, false, false, false, false, false],
  count: 0,
};

export interface NumberButtonProps {
  value: number;
  taken: boolean;
}

export const NumberButton = (props: NumberButtonProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: "5em",
        height: "5em",
        border: "2px solid green",
        color: props.taken ? "#444" : "white",
        background: props.taken ? "black" : "darkgreen",
      }}
    >
      <span style={{ fontSize: "200%", margin: "auto" }}>{props.value}</span>
    </div>
  );
};

function App() {
  const [state] = useState(initialState);

  return (
    <div>
      <div>
        <h1>Game</h1>
        <div>
          <div style={{ display: "flex" }}>
            {state.top.map((value, index) => (
              <NumberButton value={value} taken={state.topTaken[index]} />
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {state.bottom.map((value, index) => (
              <NumberButton value={value} taken={state.bottomTaken[index]} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ width: "100%", padding: "2em", border: "3px solid red" }}>
        <h1>State:</h1>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      </div>
    </div>
  );
}

export default App;
