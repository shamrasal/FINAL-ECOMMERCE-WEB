import React, { useContext } from "react";
import AuthContext from "../Store/Auth-Context";
import CartContext from "../Store/Cart-Contex";
import classes from "./Cartitem.module.css";

const CartItem = (props) => {
  const Authctx = useContext(AuthContext);
  const ctx = useContext(CartContext);
  console.log(props);
  const quantityChangeHandler = (event) => {
    event.preventDefault();
    const newQuantity = event.target.value;
    const newItem = {
      ...props,
      quantity: newQuantity,
    };
    fetch(
      `https://ecommerce-website-82afa-default-rtdb.firebaseio.com/cart${Authctx.email}/${props.id}.json`,
      {
        method: "PUT",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        props.retry((retry) => !retry);
        console.log(res);
      })
      .then((err) => {
        console.log(err);
      });
    ctx.updateItem(newItem);
    // const quantity = document.getElementById('amount').value
  };

  const removeHandler = (event) => {
    console.log("hello");
    fetch(
      `https://ecommerce-website-82afa-default-rtdb.firebaseio.com/cart${Authctx.email}/${props.id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res);
        ctx.updateItem(props);
        props.retry((retry) => !retry);
      })
      .then((err) => {
        console.log(err);
      });
  };
  return (
    <div className={classes.cartitem1}>
      <span className={classes.cartitem}>
        <img alt={props.title} src={props.image}></img>
        <h4>{props.title}</h4>
      </span>
      <span className={classes.price}>
        <h3>{props.price}</h3>
      </span>
      <span className={classes.end}>
        <input
          id='amount'
          type='number'
          key={props.id}
          min={1}
          max={5}
          step={1}
          defaultValue={props.quantity}
          onChange={quantityChangeHandler}
        ></input>
        <button onClick={removeHandler}>REMOVE</button>
      </span>
    </div>
  );
};

export default CartItem;
