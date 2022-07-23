import React, {useState, useEffect} from 'react';
import ProductItem from '../Components/ProductItem';
import { useParams } from 'react-router-dom';
import {ProductsData} from '../../ProductsData.js';
import './ProductPage.css';



const ProductPage = () => {

    let {id} = useParams();
    const [product, SetProduct] = useState(null);
    useEffect(() => {
        console.log(ProductsData)
        let product = ProductsData.find(item => item.id == id)
        console.log(product)
        SetProduct(product);
    },[])

    if(product != null)
        return (
        <div className='product-page'>
        <ProductItem
        id={product.id}
        name ={product.name}
        price ={product.price}
        image ={product.image}/>
        </div>
  
    )
    else
        return null
  
}

export default ProductPage
