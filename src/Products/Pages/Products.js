import React from 'react';
import ProductsList from '../Components/ProductsList';

const Products = () => {

    const PRODUCTS = [
        {
            id:1,
            name:'paint 1',
            image:'https://upload.wikimedia.org/wikipedia/commons/e/e0/Multicolored_tempera_paints.jpg',
            price:90
        },
        {
            id:2,
            name:'paint 2',
            image:'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2021/10/featured-image-types-of-paint.jpeg.jpg',
            price:78
        }
    ];

  return (
    <ProductsList items={PRODUCTS}/>
  )
}

export default Products