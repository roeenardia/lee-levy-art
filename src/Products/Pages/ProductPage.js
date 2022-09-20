import React, { useState, useEffect } from "react";
import ProductItem from "../Components/ProductItem";
import { useParams } from "react-router-dom";
import { ProductsData } from "../../ProductsData.js";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import "./ProductPage.css";

const ProductPage = () => {
  //const [product, SetProduct] = useState();
  const [isLoading, setIsLoading] = useState();
  const [loadedProducts, setLoadedProducts] = useState();
  let { id } = useParams();

  useEffect(() => {
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`http://localhost:5000/product/${id}`);
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setLoadedProducts(responseData.product);
        setIsLoading(false);
      } catch (err) {}
    };
    sendRequest();
  }, []);

  if (loadedProducts != null) {
    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="product-page">
          <p>
            {" "}
            33 x 49
            <input type="checkbox" />{" "}
          </p>
          <p>
            {" "}
            29 x 42
            <input type="checkbox" />{" "}
          </p>
          <ProductItem
            id={loadedProducts.id}
            name={loadedProducts.name}
            price={loadedProducts.price}
            image={loadedProducts.image}
            photos={[
              loadedProducts.photos.map((photo, key) => {
                return (key = { photo });
              }),
            ]}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ProductPage;
