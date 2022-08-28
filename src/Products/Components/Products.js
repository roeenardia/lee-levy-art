import React from 'react';
import { useEffect, useState } from 'react';
import ProductsList from '../Components/ProductsList';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedProducts, setLoadedProducts] = useState();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
      const response = await fetch('http://localhost:5000/');
      const responseData = await response.json();

        if(!response.ok){
          throw new Error(responseData.message);
        }

      setLoadedProducts(responseData.products);
      setIsLoading(false);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
      
    };
    sendRequest();
  }, []);

  const errorHandler = () =>{
    setError(null);
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner  asOverlay/>}
    {!isLoading && loadedProducts && <ProductsList items={loadedProducts}/>}
    </React.Fragment>
  )
}

export default Products