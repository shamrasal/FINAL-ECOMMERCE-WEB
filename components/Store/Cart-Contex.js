import React from "react"

const CartContext = React.createContext({
    item: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    updateItem: (id) => { }
})

export default CartContext