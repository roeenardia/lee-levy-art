import React from "react";
import { useState } from "react";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";

const OrderItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  console.log(toString(props.order));
  return (
    <React.Fragment>
      <div className="order-item">
        <div className="order-item_content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="order-item_info">
            <h3>name: {props.name}</h3>
            <h3>email: {props.email}</h3>
            <h3>order number: {props.orderNumber}</h3>
            <h3>order date: {props.orderDate}</h3>
            <h3>order: {props.order}</h3>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default OrderItem;
