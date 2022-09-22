import React, { useState } from "react";
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

  return (
    <React.Fragment>
      <div>
        <h2 className="cart-title">סל קניות</h2>
        <span className="fade-line"></span>
        <div className="cart-summery">
          סיכום הזמנה
          <span className="cart-sum-items">{countItems} :כמות מוצרים</span>
          <span className="cart-sum-price">{sum} :סה"כ הזמנה</span>
          <button className="proceed">המשך לתשלום</button>
        </div>
        <div className="cart-window">
          {cartItems.length == 0 && <CartIsEmpty />}
          {cartItems.map((product, index) => {
            return (
              <div>
                <div key={index} className="cart-item">
                  <Button danger onClick={() => RemoveProduct(product)}>
                    X
                  </Button>
                  <span>{product.productPrice}</span>
                  <span> {product.productName}</span>
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
