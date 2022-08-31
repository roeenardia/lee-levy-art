import React, {useState, useEffect} from 'react';
import ProductItem from '../Components/ProductItem';
import { useParams } from 'react-router-dom';
import {ProductsData} from '../../ProductsData.js';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';
import './ProductPage.css';



const ProductPage = () => {

    //const [product, SetProduct] = useState();
    const [isLoggedIn, setIsLoading] = useState();
    const [loadedProducts, setLoadedProducts] = useState();
    let {id} = useParams();

   useEffect(() =>{
    const sendRequest = async () =>{
        try {
            const response = await fetch(`http://localhost:5000/product/${id}`);
            const responseData = await response.json();
            if(!response.ok){
                throw new Error(responseData.message);
            }
            setLoadedProducts(responseData.product);
        } catch (err) {
            
        }
    };
    sendRequest();
   },[])
    

    if(loadedProducts != null){
        return (
        <div className='product-page'>
        <ProductItem
        id={loadedProducts.id}
        name ={loadedProducts.name}
        price ={loadedProducts.price}
        image ={loadedProducts.image}/>
        </div>
    
    )
    }else{
        return(
            null
        )
    }
    
  
}

export default ProductPage
