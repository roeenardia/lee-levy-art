import React from "react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../Shared/FormElements/Button";
import LoadingSpinner from "../../Shared/UIElements/LoadingSpinner";
import { AuthContext } from "../../Shared/Context/auth-context";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
import secureLocalStorage from "react-secure-storage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ProductItem.css";

const ProductItem = (props) => {
  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  var [cartItems, SetCartItems] = useState([]);

  const notifyAddToCart = () =>
    toast.success("מוצר נוסף לסל הקניות", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });

  const notifyItemInCart = () => {
    toast.warn("מוצר זה כבר בסל הקניות שלך", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  const AddToCart = (props) => {
    if (secureLocalStorage.getItem("cart")) {
      cartItems = JSON.parse(secureLocalStorage.getItem("cart"));
    }

    cartItems.push({
      id: props.id,
      productName: props.name,
      productPrice: props.price,
      image: props.image,
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

  const deleteHandler = async () => {
    try {
      await sendRequest(`http://localhost:5000/product/${props.id}`, "DELETE");
      props.onDelete(props.id);
    } catch (err) {}
  };


  return (
    <div className="product-item">
      <div className="product-item_content">
        {isLoading && <LoadingSpinner asOverlay />}
        <Link to={`/product/${props.id}`}>
          <div className="product-item_image">
            <img src={props.image.url} alt={props.name} />
            {/* <img src={props.photos[0].url} alt={props.name} /> */}
          </div>
          <div className="product-item_info">
            <h1>{props.name}</h1>
            <h2>₪{props.price}</h2>
          </div>
        </Link>
        {auth.isLoggedIn && (
          <Link to={`/update-product/${props.id}`}>
            {" "}
            <Button>Edit</Button>{" "}
          </Link>
        )}
        {auth.isLoggedIn && (
          <Button danger onClick={deleteHandler}>
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};
export default ProductItem;
