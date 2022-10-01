import React from "react";
import ProductItem from "./ProductItem";
import "./ProductItem.css";

const ProductsList = (props) => {
  return (
    <div className="product-grid">
      {props.items.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            photos={product.photos}
            // photos={[
            //   product.photos.map((photo, key) => {
            //     return (key = { photo }), (photo = { photo });
            //   }),
            // ]}
            price={product.price}
            onDelete={props.onDelete}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
