import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import secureLocalStorage from "react-secure-storage";
import { Cart3 } from "react-bootstrap-icons";
import "./Header.css";

const Header = () => {
  const auth = useContext(AuthContext);
  var [cartItems, SetCartItems] = useState(
    JSON.parse(secureLocalStorage.getItem("cart") || "[]")
  );

  let countItems = 0;
  for (const obj of cartItems) {
    countItems++;
  }

  return (
    <div className="header">
      <div>
        {auth.isLoggedIn && <button onClick={auth.logout}>LOG OUT</button>}
        <Link to="/cart">
          {" "}
          <div className="cart">
            {/* {countItems} */}
            <Cart3 />
          </div>{" "}
        </Link>
      </div>
      <Link to="/">
        <div className="lee-levy">Lee Levy</div>
        <div className="artist">Artist</div>
      </Link>
    </div>
  );
};

export default Header;
