import React, { useState, useContext } from "react";
import AuthContext from "./Auth-Context";
import CartContext from "./Cart-Contex";

const CarProvider = (props) => {
  const [items, setItems] = useState([]);
  const ctx = useContext(AuthContext);

  const addItemHandler = (item) => {
    const existingCartItem = items.findIndex((items) => items.id === item.id);
    if (!existingCartItem) {
      setItems((prev) => {
        return [...prev];
      });
    } else
      fetch(
        `https://ecommerce-website-82afa-default-rtdb.firebaseio.com/cart${ctx.email}.json`,
        {
          method: "POST",
          body: JSON.stringify(item),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          if (res.ok) {
            res.json().then((data) => {
              console.log(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .then(
          setItems((prev) => {
            return [...prev, item];
          })
        );
  };

  const updateItemHandler = (item) => {
    setItems((prev) => {
      return [...prev];
    });
  };

  const removeItemHandler = (id) => {
    const updatedItems = items.filter((items) => items.id !== id);
    console.log(updatedItems);

    // fetch(`https://crudcrud.com/api/5d01bcd0e85f44d7a4df52ddeff54961/cart${ctx.email}/${id}`,
    //     {
    //         method: 'DELETE'
    //     })
    //     .then(res => {
    //         props.retry(retry => !retry)
    //         console.log(res)
    //     }).then(err => {
    //         console.log(err)
    //     })
    setItems(updatedItems);
  };

  const cartContext = {
    item: items,
    addItem: addItemHandler,
    updateItem: updateItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {console.log(cartContext)}
      {props.children}
    </CartContext.Provider>
  );
};

export default CarProvider;
