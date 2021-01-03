import React from "react";
import cssClasses from "./CartItem.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { backEndUrl } from "../../../appConstants";
import { removeItem, incrItem, decrItem } from "../../../Store/cartActions";
import { useDispatch } from "react-redux";

export default (props) => {
  const dispatch = useDispatch();
  return (
    //   <div className={cssClasses.Product}>
    //     <img src={props.imageUrl} alt="img"></img>
    // <p style={{fontSize:'25px'}}>{props.name} </p>
    // <div className = {cssClasses.CartBtn}>
    //   <button>+</button>
    //   <input type="text" value="1"></input>
    //   <button>-</button>
    // </div>
    // <p style = {{color:'red'}}>Rs. {props.price}</p>
    //     <button><FontAwesomeIcon icon = {faTrash} color='gray'></FontAwesomeIcon></button>
    //   </div>
    <tr>
      <td>
        <img src={backEndUrl + props.imageUrl} alt="img"></img>
        <p style={{ fontSize: "16px" }}>{props.title}</p>
      </td>
      <td>
        <p style={{ color: "red" }}>Rs. {props.price}</p>
      </td>
      <td>
        <div className={cssClasses.CartBtn}>
          <button
            onClick={() => {
              dispatch(incrItem(props._id));
            }}
          >
            +
          </button>
          <p>{props.itemQuantity}</p>
          <button
            onClick={() => {
              dispatch(decrItem(props._id));
            }}
          >
            -
          </button>
        </div>
      </td>
      <td>
        <p style={{ color: "red" }}>Rs. {props.quantityPrice}</p>
      </td>
      <td>
        <button onClick={() => dispatch(removeItem(props._id))}>
          <FontAwesomeIcon icon={faTrash} color="gray"></FontAwesomeIcon>
        </button>
      </td>
    </tr>
  );
};
