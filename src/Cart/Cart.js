import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartIsEmpty from "./CartIsEmpty";
import Button from "../Shared/FormElements/Button";
import secureLocalStorage from "react-secure-storage";
import "./Cart.css";

const Cart = () => {
  var [cartItems, SetCartItems] = useState(
    JSON.parse(secureLocalStorage.getItem("cart") || "[]")
  );

  const SetCartProducts = (product) => {
    secureLocalStorage.setItem("cart", JSON.stringify(product));
    SetCartItems(product);
  };

  const RemoveProduct = (product) => {
    SetCartProducts(cartItems.filter((x) => x.id !== product.id));
  };
  let sum = cartItems.reduce((value, object) => {
    return value + object.productPrice;
  }, 0);

  let countItems = 0;
  for (const obj of cartItems) {
    countItems++;
  }
  console.log(cartItems);
  return (
    <React.Fragment>
      <h2 className="cart-title">סל קניות</h2>
      <div className="cart-container">
        <span className="fade-line"></span>
        <div className="cart-summery">
          סיכום הזמנה
          <span className="cart-sum-items">{countItems} :כמות מוצרים</span>
          <span className="cart-sum-price">{sum} :סה"כ הזמנה</span>
          <Link to="/checkout">
            <Button disabled={cartItems.length == 0}>המשך לתשלום</Button>
          </Link>
        </div>
        <div className="cart-window">
          {cartItems.length === 0 && <CartIsEmpty />}
          {cartItems.map((product, index) => {
            return (
              <div>
                <div key={product.id} className="cart-item">
                  <Button danger onClick={() => RemoveProduct(product)}>
                    X
                  </Button>
                  <h3>₪{product.productPrice}</h3>
                  <h3>{product.size}</h3>
                  <h3> {product.productName}</h3>
                  <img src={product.image.url} />
                </div>
                <span className="fade-line"></span>
              </div>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Cart;
