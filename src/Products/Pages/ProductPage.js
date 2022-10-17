import React, { useState, useEffect } from "react";
import ProductItem from "../Components/ProductItem";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import SimpleImageSlider from "react-simple-image-slider";
import Button from "../../Shared/FormElements/Button";
import "./ProductPage.css";

const ProductPage = () => {
  const [isLoading, setIsLoading] = useState();
  const [loadedProducts, setLoadedProducts] = useState();
  var [cartItems, SetCartItems] = useState([]);
  let { id } = useParams();
  const [size, setSize] = useState("");

  const notifyAddToCart = () =>
    toast.success("מוצר נוסף לסל הקניות", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const notifyItemInCart = () => {
    toast.warn("מוצר זה כבר בסל הקניות שלך", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const AddToCart = () => {
    if (secureLocalStorage.getItem("cart")) {
      cartItems = JSON.parse(secureLocalStorage.getItem("cart"));
    }

    cartItems.push({
      id: loadedProducts.id,
      productName: loadedProducts.name,
      productPrice: loadedProducts.price,
      image: loadedProducts.image,
      size: size,
    });

    var vlaueCart = cartItems.map(function (item) {
      return item.id;
    });
    var isDup = vlaueCart.some(function (item, idx) {
      return vlaueCart.indexOf(item) != idx;
    });
    if (isDup) {
      notifyItemInCart(onclick);
      return;
    }
    secureLocalStorage.setItem("cart", JSON.stringify(cartItems));
    notifyAddToCart(onclick);
  };

  const sizeChange = (event) => {
    setSize(event.target.value);
    console.log(event);
  };

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
    const images = [
      { url: `${loadedProducts.image.url}` },
      { url: `${loadedProducts.photos[0].url}` },
    ];
    return (
      <React.Fragment>
        {isLoading && <LoadingSpinner asOverlay />}
        <div className="product-page">
          <div className="size">
            <div className="mida">בחר מידה</div>
            <div className="radio-btn">
              <label>{loadedProducts.size[0]}</label>
              <input
                type="radio"
                name="size"
                value={loadedProducts.size[0]}
                id={loadedProducts.size[0]}
                onChange={sizeChange}
              />
            </div>
            <div className="radio-btn">
              <label>{loadedProducts.size[1]}</label>
              <input
                type="radio"
                name="size"
                value={loadedProducts.size[1]}
                id={loadedProducts.size[1]}
                onChange={sizeChange}
              />
            </div>
          </div>

          <div className="product-info">
            <SimpleImageSlider
              width={530}
              height={640}
              images={images}
              showBullets={true}
              showNavs={true}
            />
            <h2>{loadedProducts.name}</h2>
            <h3>₪{loadedProducts.price}</h3>
            <Button
              onClick={() => AddToCart() && notifyAddToCart()}
              disabled={!size}
            >
              הוסף לעגלה
              <ToastContainer />
            </Button>
          </div>
        </div>
        <div className="product-page-item">
          <ProductItem
            key={loadedProducts.id}
            id={loadedProducts.id}
            name={loadedProducts.name}
            price={loadedProducts.price}
            image={loadedProducts.image}
          />
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
};

export default ProductPage;
