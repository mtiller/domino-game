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

function parseKey(s: string): Selected {
  if (s.startsWith("top-")) {
    return {
      row: "top",
      col: +s.slice(4),
    };
  } else if (s.startsWith("bottom-")) {
    return {
      row: "bottom",
      col: +s.slice(7),
    };
  }
  throw new Error(`The key ${s} is not a valid select key`);
}

const initialState: State = {
  lastRoll: null,
  readyToRoll: true,
  selected: [],
  top: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  topTaken: [false, false, false, false, false, false, false, false, false],
  bottom: [9, 8, 7, 6, 5, 4, 3, 2, 1],
  bottomTaken: [false, false, false, false, false, false, false, false, false],
  count: 0,
};

function canSelect(me: Selected, state: State): boolean {
  if (me.row === "top") {
    if (state.topTaken[me.col]) {
      return false;
    }
    if (state.bottomTaken[me.col] == false) {
      return false;
    }
  } else {
    if (state.bottomTaken[me.col]) {
      return false;
    }
  }
  return true;
}

function App() {
  const [state, setState] = useState(initialState);

  const toggleHandler = (me: Selected) => {
    console.log("Clicked on ", me);
    if (canSelect(me, state)) {
      const key = selectKey(me);
      let nextSelected = [...state.selected];
      const myIndex = nextSelected.indexOf(key);
      if (myIndex == -1) {
        nextSelected = [...state.selected, key];
      } else {
        nextSelected = [
          ...nextSelected.slice(0, myIndex),
          ...nextSelected.slice(myIndex + 1),
        ];
      }
      if (state.lastRoll != null) {
        const dieSum = state.lastRoll[0] + state.lastRoll[1];
        const selectedSum = nextSelected.reduce((subtotal, cur) => {
          const me = parseKey(cur);
          if (me.row == "top") {
            return subtotal + state.top[me.col];
          } else {
            return subtotal + state.bottom[me.col];
          }
        }, 0);
        console.log("Sum of dice = ", dieSum);
        console.log("Sum of selected = ", selectedSum);
        if (dieSum == selectedSum) {
          const nextState = { ...state };
          for (const key of nextSelected) {
            const me = parseKey(key);
            // Mark selected item as taken
            if (me.row == "top") {
              const newTaken = [...nextState.topTaken];
              newTaken[me.col] = true;
              nextState.topTaken = newTaken;
            } else {
              const newTaken = [...nextState.bottomTaken];
              newTaken[me.col] = true;
              nextState.bottomTaken = newTaken;
            }
          }
          nextState.selected = [];
          nextState.readyToRoll = true;
          setState(nextState);
          return;
        }
      }
      // Reset selected to be empty
      setState((s) => ({
        ...s,
        selected: nextSelected,
      }));
    }
  };

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
                  key={selectKey(me)}
                  value={value}
                  taken={state.topTaken[index]}
                  selected={state.selected.indexOf(selectKey(me)) != -1}
                  toggle={() => toggleHandler(me)}
                />
              );
            })}
          </div>
          <div id="bottom_numbers" style={{ display: "flex" }}>
            {state.bottom.map((value, index) => {
              const me: Selected = { row: "bottom", col: index };
              return (
                <NumberButton
                  key={selectKey(me)}
                  value={value}
                  taken={state.bottomTaken[index]}
                  selected={state.selected.indexOf(selectKey(me)) != -1}
                  toggle={() => {
                    toggleHandler(me);
                  }}
                />
              );
            })}
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
          <button onClick={() => setState(initialState)}>Reset</button>
        </div>
      </div>
      {/* <div style={{ width: "100%", padding: "2em", border: "3px solid red" }}>
        <h1>State:</h1>
        <pre>{JSON.stringify(state, null, 4)}</pre>
      </div> */}
    </div>
  );
}

export default App;
