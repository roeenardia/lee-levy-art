import React from 'react';
import ProductItem from './ProductItem';
import './ProductItem.css';

const ProductsList = (props) => {
  return (
    <div className='product-grid'>
        {props.items.map((product) =>{
            return <ProductItem  
                key={product.id} 
                id={product.id} 
                name={product.name} 
                image={product.image}
                price={product.price}/>
        })}
    </div>
  )
}

export default ProductsList