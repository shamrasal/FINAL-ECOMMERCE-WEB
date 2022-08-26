import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../Store/Auth-Context";
import CartContext from "../Store/Cart-Contex";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import swal from "sweetalert";

// const cartElements = [
//     {
//         id: 'cart1',
//         title: 'Colors',
//         price: 100,
//         imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
//         quantity: 2,
//     },
//     {
//         id: 'cart2',
//         title: 'Black and white Colors',
//         price: 50,
//         imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
//         quantity: 3,
//     },
//     {
//         id: 'cart3',
//         title: 'Yellow and Black Colors',
//         price: 70,
//         imageUrl: 'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
//         quantity: 1,
//     }
// ]

const Cart = (props) => {
  const [retry, setretry] = useState(false);
  const [cartList, setCartList] = useState();
  let [totalPrice, settotalPrice] = useState(0);
  const Authctx = useContext(AuthContext);
  const ctx = useContext(CartContext);

  useEffect(() => {
    fetch(
      `https://ecommerce-website-82afa-default-rtdb.firebaseio.com/cart${Authctx.email}.json`
    )
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            console.log(data);
            let loadcart = [];
            for (const key in data) {
              console.log(data[key]);
              loadcart.push({
                id: key,
                key: key,
                title: data[key].title,
                price: data[key].price,
                image: data[key].image,
                quantity: data[key].quantity,
              });
            }
            const cartList = loadcart.map((item) => (
              <CartItem
                // key={Math.random().toString()}
                id={item.id}
                key={item.id}
                title={item.title}
                price={item.price}
                image={item.image}
                quantity={item.quantity}
                retry={setretry}
              ></CartItem>
            ));
            let price = 0;
            loadcart.map(
              (item) => (price = price + +item.price * +item.quantity)
            );
            settotalPrice(price);
            setCartList(cartList);
          });
        }
      })
      .then((err) => {
        console.log(err);
      });
  }, [retry, Authctx.email, ctx]);

  // const cartList = ctx.item.map((item) => (
  //     <CartItem
  //         // key={Math.random().toString()}
  //         id={item.id}
  //         title={item.title}
  //         price={item.price}
  //         image={item.image}
  //         quantity={item.quantity}
  //         // retry={setretry}
  //     ></CartItem>
  // ))

  // let totalPrice = 0
  // ctx.item.map((item) => {
  //     totalPrice = totalPrice + item.price * item.quantity
  // })

  const removeCartHandler = (event) => {
    event.preventDefault();
    props.isVisible(false);
  };

  const purchaseHandler = () => {
    swal("thank you!", "Your parcel on the way !", "success");
  };

  return (
    <div className={classes.cart}>
      <h3 className={classes.h1}>CART</h3>
      <button onClick={removeCartHandler} className={classes.cancel}>
        x
      </button>
      <span className={classes.intro}>
        <section className={classes.h2}>ITEM</section>
        <section className={classes.h2}>PRICE</section>
        <section className={classes.h2}>QUANTITY</section>
      </span>
      <span>
        <ul>{cartList}</ul>
      </span>
      <span className={classes.carttotal}>
        <h3 className={classes.h4}>{totalPrice} </h3>
        <h2>TOTAL : RS</h2>
      </span>
      <button onClick={purchaseHandler} className={classes.btn}>
        PURCHASE
      </button>
    </div>
  );
};

export default Cart;
