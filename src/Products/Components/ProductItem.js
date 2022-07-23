import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Shared/FormElements/Button';

import './ProductItem.css';

const ProductItem = (props) => {
  return (   
      <div className='product-item'>
        <div className='product-item_content'>
            <Link to={`/${props.id}/${props.name}`}>
            <div className='product-item_image'>
                <img src={props.image} alt={props.name}/>
            </div>
            <div className='product-item_info'>
                <h2>{props.name}</h2>
                <h3>{props.price}</h3>
            </div>
            </Link>
            <Button>הוסף לעגלה</Button>
        </div>
      </div>
    
  )
}
export default ProductItem