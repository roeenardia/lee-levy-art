import React from "react";
import OrderItem from "./OrderItem";

const OrdersList = (props) => {
  return (
    <div>
      {props.items.map((order) => {
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
