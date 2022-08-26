import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import classes from "./ProductDetails.module.css";
const ProductDetails = (props) => {
  const [dataItem, setDataItem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const ctx = useContext(CartContext);
  const [hover, setHover] = useState(false);
  const [error, seterror] = useState(null);
  const [zoom, setZoom] = useState(false);
  const history = useHistory();
  const param = useParams();
  console.log(isLoading);

  console.log(hover);
  console.log(error);

  console.log(param.productId);
  useEffect(() => {
    async function xyz() {
      setIsLoading(true);
      seterror(null);
      try {
        const res = await fetch(
          `https://fakestoreapi.com/products/${param.productId}`
        );
        if (!res.ok) {
          throw new Error("Something went wrong ....Retrying");
        }
        const data = await res.json();
        setDataItem(data);
      } catch (err) {
        seterror(err.message);
      }
      setIsLoading(false);
    }
    xyz();
  }, [param.productId]);

  const mousemoveHandler = (event) => {
    setZoom(
      <img className={classes.img3} alt={props.id} src={dataItem.image}></img>
    );
    setHover(true);
  };
  const mouseOutHandler = (event) => {
    setZoom("");
    setHover(true);
  };
  const backHandler = (event) => {
    event.preventDefault();
    history.replace("/store");
  };
  // const CartHandler = (event) => {
  //   event.preventDefault();
  //   console.log(dataItem);
  //   ctx.addItem({
  //     id: dataItem.id,
  //     title: dataItem.title,
  //     image: dataItem.image,
  //     price: dataItem.price,
  //     quantity: 1,
  //   });
  // };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <span className={classes.image}>
          <span className={classes.imagespan1}>
            <img
              className={classes.img1}
              alt={props.id}
              src={dataItem.image}
            ></img>
          </span>
          <span>
            <img
              className={classes.img2}
              onMouseOut={mouseOutHandler}
              onMouseOver={mousemoveHandler}
              alt={props.id}
              src={dataItem.image}
            ></img>
          </span>
        </span>
        <span className={classes.info}>
          <span>
            <h3>Verified by The generics</h3>
          </span>
          <span>
            <h3>{dataItem.category}</h3>
          </span>
          <span>
            <h1>{dataItem.title}</h1>
          </span>
          <span>
            <p>{dataItem.description}</p>
          </span>
          <span>
            <h2>RS {dataItem.price}</h2>
          </span>
          <span>
            <p>Rating 3.4 (144)</p>
          </span>
          <span>
            {/* <button onClick={CartHandler}>Add To Cart</button> */}
            <button onClick={backHandler}>Back To Products</button>
          </span>
          {zoom}
        </span>
      </div>
    </div>
  );
};

export default ProductDetails;
