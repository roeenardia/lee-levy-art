import React, { useState } from "react";
import Button from "../Shared/FormElements/Button";
import "./Cart.css";

const Cart = () => {
  //let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  var [cartItems, SetCartItems] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );
  //var [cartItems, SetCartItems] = useState([]);

  //console.log(cartProducts);
  const SetCartProducts = (product) => {
    localStorage.setItem("cart", JSON.stringify(product));
    SetCartItems(product);
  };

  const RemoveProduct = (product) => {
    SetCartProducts(cartItems.filter((x) => x.id !== product.id));
  };

  return (
    <div>
      <h2 className="cart-title">סל קניות</h2>
      <div>
        {cartItems.map((product, index) => {
          return (
            <div key={index} className="cart-item">
              <img src={product.image.url} />
              <span> {product.productName}</span>
              <span>{product.productPrice}</span>
              <Button danger onClick={() => RemoveProduct(product)}>
                X
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
