import React from "react";
import { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";

const Orders = () => {
  const [loadedOrders, setLoadedOrders] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5000/orders-history");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedOrders(responseData.orders);
        setIsLoading(false);
      } catch (err) {}
    };
    sendRequest();
  }, []);
  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && loadedOrders && <OrdersList items={loadedOrders} />}
    </React.Fragment>
  );
};

export default Orders;
