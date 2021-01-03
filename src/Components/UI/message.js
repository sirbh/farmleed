import React from "react";
import cssClasses from "./message.module.scss";
import Button from "../UI/Button";
import { useDispatch, useSelector } from "react-redux";
import * as MessageAction from "../../Store/messageActions";
export default (props) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.message.message);
  return (
    <div className={cssClasses.Message}>
      <div className={cssClasses.Head}>
        <h2>Success</h2>
      </div>
      <p>{message}</p>
      <Button
        width="20%"
        height="40px"
        btnname="Cancal"
        clicked={() => {
          dispatch(MessageAction.hideMessage());
        }}
      ></Button>
    </div>
  );
};
