import React from "react";
import { useState, useEffect, useCallback } from "react";
import OrderItem from "./OrderItem";
import "./OrderItem.css";

const OrdersList = (props) => {
  const [search, SetSearch] = useState("");

  return (
    <div className="order-list">
      <input
        type="text"
        placeholder="חפש מספר הזמנה"
        onChange={(event) => {
          SetSearch(event.target.value);
        }}
      />
      {props.items
        .filter((order) => {
          if (search == "") {
            return order;
          } else if (order.orderNumber.includes(search)) {
            return order;
          }
        })
        .map((order) => {
          return (
            <OrderItem
              key={order.id}
              id={order.id}
              name={order.name}
              email={order.email}
              order={order.order}
              orderNumber={order.orderNumber}
              orderDate={order.orderDate}
            />
          );
        })}
    </div>
  );
};

export default OrdersList;
