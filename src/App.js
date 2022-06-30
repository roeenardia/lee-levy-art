import React from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import Products from "./Products/Pages/Products";
import NewProduct from "./Products/Pages/NewProduct";
import Header from "./Shared/Header/Header";
import Footer from "./Shared/Footer/Footer";
import Contatct from "./Shared/Footer/Contact/Contatct";



const App = () => {

  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact> <Products /> </Route>

        <Route path="/new/product" exact> <NewProduct /> </Route>

        <Route path="/contact" exact> <Contatct /> </Route>

        <Redirect to="/"/>

      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
