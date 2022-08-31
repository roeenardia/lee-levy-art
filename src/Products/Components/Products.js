import React from 'react';
import { useEffect, useState } from 'react';
import ProductsList from '../Components/ProductsList';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';
import { useHttpClient } from '../../Shared/Hooks/http-hook';

const Products = (props) => {
  const [loadedProducts, setLoadedProducts] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  
  useEffect(() => {
    const sendRequest = async () => {
      
      try {
      const response = await fetch('http://localhost:5000/');
      const responseData = await response.json();

        if(!response.ok){
          throw new Error(responseData.message);
        }

      setLoadedProducts(responseData.products);
      } catch (err) {}   
    };
    sendRequest();
  }, []);

  

  const productDeletedHandler = (deletedProductId) =>{
    setLoadedProducts(prevProduct => prevProduct.filter(product => product.id !== deletedProductId));
  };



  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner  asOverlay/>}
    {!isLoading && loadedProducts && <ProductsList items={loadedProducts} onDelete={productDeletedHandler}/>}
    </React.Fragment>
  )
}

export default Products