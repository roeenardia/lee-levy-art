import React, { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Products from "./Products/Components/Products";
import NewProduct from "./Products/Pages/NewProduct";
import ProductPage from "./Products/Pages/ProductPage";
import Messages from "./Products/Components/Messages";
import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";
import Contatct from "./Shared/Footer/Contact/Contatct";
import UpdateProduct from "./Products/Pages/UpdateProduct";
import Admin from "./Admin/Admin";
import Login from "./Products/Pages/Login";
import Cart from "./Cart/Cart";
import Checkout from "./Cart/Checkout";
import Orders from "./Products/Components/Orders";
import { AuthContext } from "./Shared/Context/auth-context";
import secureLocalStorage from "react-secure-storage";

const App = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [useId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    SetIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    secureLocalStorage.removeItem("user");
    SetIsLoggedIn(false);
    setUserId(null);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(secureLocalStorage.getItem("user"));
    if (storedUser) {
      login();
      SetIsLoggedIn(true);
    }
  }, [login]);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>

        <Route path="/update-product/:id" exact>
          <UpdateProduct />
        </Route>

        <Route path="/product/:id" exact>
          <ProductPage />
        </Route>

        <Route path="/new-product" exact>
          <NewProduct />
        </Route>

        <Route path="/admin" exact>
          <Admin />
        </Route>

        <Route path="/messages" exact>
          <Messages />
        </Route>

        <Route path="/contact" exact>
          <Contatct />
        </Route>

        <Route path="/orders-history">
          <Orders />
        </Route>

        <Redirect to="/admin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Products />
        </Route>

        <Route path="/product/:id" exact>
          <ProductPage />
        </Route>

        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/cart" exact>
          <Cart />
        </Route>

        <Route path="/checkout" exact>
          <Checkout />
        </Route>

        <Route path="/contact" exact>
          <Contatct />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        userId: useId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Header />
        {/* <Switch> */}
        {/* <Route path="/" exact> <Products /> </Route>

        <Route path="/update-product/:id" exact> <UpdateProduct /> </Route>

        <Route path= "/:id/:productName" exact> <ProductPage /> </Route>

        <Route path="/new-product" exact> <NewProduct /> </Route>

        <Route path="/login" exact> <Login /> </Route>

        <Route path="/admin" exact> <Admin /> </Route>

        <Route path="/contact" exact> <Contatct /> </Route>

        <Redirect to="/"/> */}
        {routes}
        {/* </Switch> */}
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
