import { useState } from "react";
import random from "random";
import { Die } from "./die";
import { NumberButton } from "./number_button";

export interface State {
  lastRoll: [number, number] | null;
  readyToRoll: boolean;
  selected: string[];
  top: number[];
  topTaken: boolean[];
  bottom: number[];
  bottomTaken: boolean[];
  count: number;
}

export interface Selected {
  row: "top" | "bottom";
  col: number;
}

function selectKey(s: Selected): string {
  return `${s.row}-${s.col}`;
}

const initialState: State = {
  lastRoll: null,
  readyToRoll: true,
  selected: [],
  top: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  topTaken: [false, true, false, false, false, false, false, false, false],
  bottom: [9, 8, 7, 6, 5, 4, 3, 2, 1],
  bottomTaken: [false, false, false, false, false, false, false, false, false],
  count: 0,
};

function canSelect(): boolean {
  return true;
}

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
            {state.top.map((value, index) => {
              const me: Selected = { row: "top", col: index };
              return (
                <NumberButton
                  key={`top-${index}`}
                  value={value}
                  taken={state.topTaken[index]}
                  selected={state.selected.indexOf(selectKey(me)) != -1}
                  toggle={() => {
                    console.log("Clicked on ", me);
                    if (canSelect()) {
                      const key = selectKey(me);
                      console.log("Previously selected", state.selected);
                      let nextSelected = [...state.selected];
                      if (nextSelected.indexOf(key) == -1) {
                        nextSelected = [...state.selected, key];
                      }
                      console.log("Next Selected should be", nextSelected);
                      setState((s) => ({
                        ...s,
                        selected: nextSelected,
                      }));
                    }
                  }}
                />
              );
            })}
          </div>
          <div id="bottom_numbers" style={{ display: "flex" }}>
            {state.bottom.map((value, index) => (
              <NumberButton
                key={`bottom-${index}`}
                value={value}
                taken={state.bottomTaken[index]}
                selected={false}
                toggle={() => {}}
              />
            ))}
          </div>
        </div>
        <div>
          <button
            disabled={!state.readyToRoll}
            onClick={() => {
              const roll1 = random.int(1, 6);
              const roll2 = random.int(1, 6);
              setState((s) => ({
                ...s,
                readyToRoll: false,
                lastRoll: [roll1, roll2],
              }));
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
