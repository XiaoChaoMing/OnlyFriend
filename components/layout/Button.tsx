import React from "react";
import PropTypes from "prop-types";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { useDispatch, useSelector } from "react-redux";
import { setFollow, setUnfollow } from "@/app/store/slice";
import { twMerge } from "tailwind-merge";
import { RootState } from "@/app/store/store";
interface ButtonProp {
  className?: string;
  text: string;
  handleFunc: () => void;
}
const Button: React.FC<ButtonProp> = ({ className, text, handleFunc }) => {
  return (
    <>
      <button
        onClick={handleFunc}
        className={twMerge(
          `flex flex-row justify-center gap-2 bg-blue-400 px-3 py-2 rounded-md text-white `,
          className
        )}
        type="button"
      >
        <AssignmentTurnedInIcon />
        {text}
      </button>
    </>
  );
};

Button.propTypes = {};

export default Button;
