import React, { useState, useCallback } from "react";
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
import { AuthContext } from "./Shared/Context/auth-context";

const App = () => {
  const [isLoggedIn, SetIsLoggedIn] = useState(false);
  const [useId, setUserId] = useState(false);

  const login = useCallback((uid) => {
    SetIsLoggedIn(true);
    setUserId(uid);
  }, []);
  const logout = useCallback(() => {
    SetIsLoggedIn(false);
    setUserId(null);
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/" exact>
          {" "}
          <Products />{" "}
        </Route>
        <Route path="/update-product/:id" exact>
          {" "}
          <UpdateProduct />{" "}
        </Route>
        <Route path="/product/:id" exact>
          {" "}
          <ProductPage />{" "}
        </Route>
        <Route path="/new-product" exact>
          {" "}
          <NewProduct />{" "}
        </Route>
        <Route path="/admin" exact>
          {" "}
          <Admin />{" "}
        </Route>
        <Route path="/messages" exact>
          {" "}
          <Messages />{" "}
        </Route>
        <Route path="/contact" exact>
          {" "}
          <Contatct />{" "}
        </Route>
        <Redirect to="/admin" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          {" "}
          <Products />{" "}
        </Route>
        <Route path="/product/:id" exact>
          {" "}
          <ProductPage />{" "}
        </Route>
        <Route path="/login" exact>
          {" "}
          <Login />{" "}
        </Route>
        <Route path="/cart" exact>
          {" "}
          <Cart />{" "}
        </Route>
        <Route path="/contact" exact>
          {" "}
          <Contatct />{" "}
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
