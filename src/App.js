import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Products from "./Products/Pages/Products";
import NewProduct from "./Products/Pages/NewProduct";
import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";



const App = () => {

  return (
    <Router>
      <header><Header /></header>
      <Switch>
        <Route path="/" exact> <Products /> </Route>

        <Route path="/new/product" exact> <NewProduct /> </Route>

        <Redirect to="/"/>

      </Switch>
      <footer><Footer /></footer>
    </Router>
  );
}

export default App;
