import { ReactNode } from "react";
import "./Button.css";

interface Props {
  children: ReactNode;
  onClick: () => void;
  style: "white" | "black";
}

const Button = ({ children, onClick, style }: Props) => {
  if (style == "black") {
    return (
      <>
        <button
          className={"button simpleButton " + style + "Button"}
          onClick={onClick}
        >
          {children}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button
          className={"button simpleButton " + style + "Button"}
          onClick={onClick}
        >
          {children}
        </button>
      </>
    );
  }
};

export default Button;
