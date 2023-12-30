import { useState } from "react";
import random from "random";
import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons-react";

export interface State {
  lastRoll: [number, number] | null;
  top: number[];
  topTaken: boolean[];
  bottom: number[];
  bottomTaken: boolean[];
  count: number;
}

const initialState: State = {
  lastRoll: null,
  top: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  topTaken: [false, true, false, false, false, false, false, false, false],
  bottom: [9, 8, 7, 6, 5, 4, 3, 2, 1],
  bottomTaken: [false, false, false, false, false, false, false, false, false],
  count: 0,
};

export interface DieProps {
  value: number;
}

export const Die = (props: DieProps) => {
  switch (props.value) {
    case 1:
      return <IconDice1 />;
    case 2:
      return <IconDice2 />;
    case 3:
      return <IconDice3 />;
    case 4:
      return <IconDice4 />;
    case 5:
      return <IconDice5 />;
    case 6:
      return <IconDice6 />;
  }
  return null;
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
  const [state, setState] = useState(initialState);

  return (
    <div>
      <div>
        <h1>Game</h1>
        {state.lastRoll == null ? (
          <h2>Start by rolling the Die</h2>
        ) : (
          <h2>
            Last Roll: <Die value={state.lastRoll[0]} /> +{" "}
            <Die value={state.lastRoll[1]} />={" "}
            {state.lastRoll[0] + state.lastRoll[1]}
          </h2>
        )}
        <div id="numbers">
          <div id="top_numbers" style={{ display: "flex" }}>
            {state.top.map((value, index) => (
              <NumberButton value={value} taken={state.topTaken[index]} />
            ))}
          </div>
          <div id="bottom_numbers" style={{ display: "flex" }}>
            {state.bottom.map((value, index) => (
              <NumberButton value={value} taken={state.bottomTaken[index]} />
            ))}
          </div>
        </div>
        <div>
          <button
            onClick={() => {
              const roll1 = random.int(1, 6);
              const roll2 = random.int(1, 6);
              setState((s) => ({ ...s, lastRoll: [roll1, roll2] }));
            }}
          >
            Roll Die
          </button>
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
