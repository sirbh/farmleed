import React from "react";
import cssClasses from "./Tracker.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBox,
  faCheck,
  faClipboard,
  faClipboardCheck,
  faShip,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";

export default (props) => {
  let track1;
  let message;
  let track2;
  let track3;
  let mark1;
  let mark2;
  let mark3;
  let label1;
  let label2;
  let label3;
  let status = props.statusFlag;

  switch (status) {
    case 1: {
      track1 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      track2 = [cssClasses.Tracker].join(" ");
      track3 = [cssClasses.Tracker].join(" ");
      mark1 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      mark2 = [cssClasses.Mark].join(" ");
      mark3 = [cssClasses.Mark].join(" ");
      label1 = [cssClasses.Label, cssClasses.ActiveLabel].join(" ");
      label2 = [cssClasses.Label].join(" ");
      label3 = [cssClasses.Label].join(" ");
      message = (
        <>
          <p>
            Order is being packed<span className={cssClasses.spinner}></span>
          </p>
        </>
      );
      break;
    }
    case 2: {
      track1 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      track2 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      track3 = [cssClasses.Tracker].join(" ");
      mark1 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      mark2 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      mark3 = [cssClasses.Mark].join(" ");
      label1 = [cssClasses.Label, cssClasses.ActiveLabel].join(" ");
      label2 = [cssClasses.Label, cssClasses.ActiveLabel].join(" ");
      label3 = [cssClasses.Label].join(" ");
      break;
    }
    case 3: {
      track1 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      track2 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      track3 = [cssClasses.Tracker, cssClasses.TrackActive].join(" ");
      mark1 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      mark2 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      mark3 = [cssClasses.Mark, cssClasses.Mark2].join(" ");
      label1 = [cssClasses.Label, cssClasses.ActiveLabel].join(" ");
      label2 = [cssClasses.Label, cssClasses.ActiveLabel].join(" ");
      label3 = [cssClasses.Label,cssClasses.ActiveLabel].join(" ");
      message = (
        <>
          <p>
            Order ready to collect<span><FontAwesomeIcon icon={faCheck} style = {{marginTop:'10px',color:'#97BC62FF'}}></FontAwesomeIcon></span>
          </p>
        </>
      );
      break;
    }
    default: {
      track1 = [cssClasses.Tracker].join(" ");
      track2 = [cssClasses.Tracker].join(" ");
      track3 = [cssClasses.Tracker].join(" ");
      mark1 = [cssClasses.Mark].join(" ");
      mark2 = [cssClasses.Mark].join(" ");
      mark3 = [cssClasses.Mark].join(" ");
      label1 = [cssClasses.Label].join(" ");
      label2 = [cssClasses.Label].join(" ");
      label3 = [cssClasses.Label].join(" ");
      message = (
        <>
          <p>
            order cancaled/cannot be processed
          </p>
        </>
      );
    }
  }

  return (
    <div className={cssClasses.Main}>
      <h4>
        Order ID: <span>{props.Id}</span>
      </h4>
      <h3>Amount Payable: Rs.{props.totalPrice}</h3>
      {message}
      <div className={cssClasses.btnClass}>
        <button style={{ backgroundColor: "#97bc62ff" }} onClick = {props.clicked}>Details</button>
        {props.statusFlag!==-1?<button style={{ backgroundColor: "#e03531" }} onClick = {props.cancaled}>Cancal</button>:null}
      </div>
      <div className={cssClasses.Holder}>
        <div className={track1} style={{ width: "10%" }}>
          <div className={mark1}>
            <div className={cssClasses.Check}>
              <FontAwesomeIcon icon={faCheck} size="xs"></FontAwesomeIcon>
            </div>
            <div className={label1}>
              <span>Order Recieved</span>
              <FontAwesomeIcon icon={faClipboardCheck}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className={track2} style={{ width: "45%" }}>
          <div className={mark2}>
            <div className={cssClasses.Check}>
              <FontAwesomeIcon icon={faCheck} size="xs"></FontAwesomeIcon>
            </div>
            <div className={label2}>
              <span>Packed</span>
              <FontAwesomeIcon icon={faBox}></FontAwesomeIcon>
            </div>
          </div>
        </div>
        <div className={track3} style={{ width: "30%" }}>
          <div className={mark3}>
            <div className={cssClasses.Check}>
              <FontAwesomeIcon icon={faCheck} size="xs"></FontAwesomeIcon>
            </div>
            <div className={label3}>
              <span>Ready for pickup</span>
              <FontAwesomeIcon icon={faShoppingBag}></FontAwesomeIcon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
