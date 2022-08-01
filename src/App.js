import React, {useState, useCallback} from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Products from "./Products/Components/Products";
import NewProduct from "./Products/Pages/NewProduct";
import ProductPage from "./Products/Pages/ProductPage";
import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";
import Contatct from "./Shared/Footer/Contact/Contatct";
import UpdateProduct from "./Products/Pages/UpdateProduct";
import Admin from "./Admin/Admin";
import Login from "./Products/Pages/Login";
import { AuthContext } from "./Shared/Context/auth-context";



const App = () => {

  const [isLoggedIn, SetIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    SetIsLoggedIn(true);
  }, []);
  const logout = useCallback(() => {
    SetIsLoggedIn(false);
  }, []);

  let routes;
  if(isLoggedIn){
    routes = (
      <Switch>
        <Route path="/" exact> <Products /> </Route>
        <Route path="/update-product/:id" exact> <UpdateProduct /> </Route>
        <Route path= "/:id/:productName" exact> <ProductPage /> </Route>
        <Route path="/new-product" exact> <NewProduct /> </Route>
        <Route path="/admin" exact> <Admin /> </Route>
        <Route path="/contact" exact> <Contatct /> </Route>
        <Redirect to="/admin"/>
      </Switch>
    );
  } else {
    routes =(
      <Switch>
      <Route path="/" exact> <Products /> </Route>
      <Route path= "/:id/:productName" exact> <ProductPage /> </Route>
      <Route path="/login" exact> <Login /> </Route>
      <Route path="/contact" exact> <Contatct /> </Route>
      <Redirect to="/"/>
      </Switch>
    );
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login: login, logout: logout}}>
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
}

export default App;
