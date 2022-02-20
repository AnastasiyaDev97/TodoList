import s from "./Button.module.css";
import { FC, memo } from "react";
import { Button } from "@material-ui/core";

type ButtonPropsType = {
  callback: () => void;
  title: string;
};
export const UniversalButton: FC<ButtonPropsType> = memo(
  ({ callback, title }) => {
    return (
      <Button
        variant="text"
        size="small"
        color="primary"
        onClick={callback}
        className={s.btn}
      >
        {title}
      </Button>
    );
  }
);
