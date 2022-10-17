import React from "react";
import { useState } from "react";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import "./OrderItem.css";

const OrderItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  let sum = props.order.reduce((value, object) => {
    return value + object.productPrice;
  }, 0);

  return (
    <React.Fragment>
      <div className="order-item">
        <div className="order-item_content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="order-item_info">
            <h3>שם: {props.name}</h3>
            <h3>אימייל: {props.email}</h3>
            <h3>מספר הזמנה: {props.orderNumber}</h3>
            <h3>תאריך הזמנה: {props.orderDate}</h3>
            <div className="order-items">
              <h3>הזמנה:</h3>
              {props.order.map((item, index) => {
                return (
                  <div className="product-orderd" key={index}>
                    <img src={item.image.url} />
                    <h3>שם מוצר: {item.productName}</h3>
                    <h3
                      style={{
                        direction: "initial",
                      }}
                    >
                      {item.size} :מידה
                    </h3>
                    <h3>מחיר: ₪{item.productPrice}</h3>
                  </div>
                );
              })}
            </div>
            <h3>סה"כ הזמנה: ₪{sum}</h3>
            <span className="fade-line"></span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderItem;
