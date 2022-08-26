import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../Store/Auth-Context'
import CartContext from '../../Store/Cart-Contex'
import classes from './productItem.module.css'
const ProductItem = (props) => {
    const ctx = useContext(AuthContext)
    const cartctx = useContext(CartContext)
    const addCartItemHandler = () => {
        cartctx.addItem({
            id: props.id,
            title: props.title,
            image: props.image,
            price: props.price,
            quantity: 1
        })
        console.log(ctx.item)

        // fetch(`https://crudcrud.com/api/5d01bcd0e85f44d7a4df52ddeff54961/cart${ctx.email}`,
        //     {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             id: props.id,
        //             title: props.title,
        //             image: props.image,
        //             price: props.price,
        //             quantity: 1
        //         }),
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     }).then(res => {
        //         if (res.ok) {
        //             res.json().then(data => {
        //                 console.log(data)
        //                 cartctx.addItem(data)
        //             })
        //         }
        //     }).then(err => {
        //         console.log(err)
        //     })
    }


    // {  <ProductDetails
    //     className={classes.hide}
    //     key={props.id}
    //     id={props.id}
    //     title={props.title}
    //     price={props.price}
    //     image={props.image}
    //     category={props.category}
    //     description={props.description}
    //     rating={props.rating
    //     } />}

    return (
        <li className={classes.productItem}>
            <span className={classes.h1}>
                <h2>{props.title}</h2>
            </span>
            <Link to={`/Details/${props.id}`}>
                <span className={classes.img1}>
                    <img alt="img1" className={classes.img} src={props.image}></img>
                </span>
            </Link>
            <span className={classes.price}>
                <h2>{props.price} RS</h2>
                <button onClick={addCartItemHandler} className={classes.button}>ADD TO CART</button>
            </span>
        </li >

    )
}

export default ProductItem