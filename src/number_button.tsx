export interface NumberButtonProps {
  value: number;
  taken: boolean;
  selected: boolean;
  toggle: () => void;
}

export const NumberButton = (props: NumberButtonProps) => {
  return (
    <div
      style={{
        display: "flex",
        width: "5em",
        height: "5em",
        border: props.selected ? "3px solid white" : "2px solid green",
        color: props.taken ? "#444" : "white",
        background: props.taken ? "black" : "darkgreen",
      }}
    >
      <span style={{ fontSize: "200%", margin: "auto" }} onClick={props.toggle}>
        {props.value}
      </span>
    </div>
  );
};
