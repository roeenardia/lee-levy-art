import React from 'react';
import ProductsList from '../Components/ProductsList';
import {ProductsData} from '../../ProductsData.js';

const Products = () => {

  return (
    <ProductsList items={ProductsData}/>
  )
}

export default Products