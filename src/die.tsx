import {
  IconDice1,
  IconDice2,
  IconDice3,
  IconDice4,
  IconDice5,
  IconDice6,
} from "@tabler/icons-react";

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
