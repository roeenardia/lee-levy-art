import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../Shared/FormElements/Button';
import Input from '../../Shared/FormElements/Input';
import { VALIDATOR_FILE, VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import LoadingSpinner from '../../Shared/UIElements/LoadingSpinner';
import './NewProduct.css';


const NewProduct = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formState, inputHandler] = useForm(
    {
      name:{
        value: '',
        isValid: false
      },
      price:{
        value: '',
        isValid: false
      },
      image:{
        value: '',
        isValid: false
      }
    },
    false
  );

    const history = useHistory();

  const productSubmitHandler = async (event) =>{
    event.preventDefault();
    
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:5000/new-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          price: formState.inputs.price.value,
          image: formState.inputs.image.value
        })
      });
      const responseData = await response.json();
        if(!response.ok){
            throw new Error(responseData.message);
        }
        setIsLoading(false); 
        history.push('/');
    } catch (err) {
      console.log(err);
            setIsLoading(false); 
            setError(err.message || 'Somthing went wrong, Please try again');
            alert(err.message);
    }
  }


  return (
    <React.Fragment>
    <form className='product-form' onSubmit={productSubmitHandler}>
      {isLoading && <LoadingSpinner asOverlay/>}
      <Input
        id="name" 
        element="input" 
        type="text" 
        label="Product Name"
        validators={[VALIDATOR_REQUIRE()]}  
        errorText="Please enter a vaild name"
        onInput={inputHandler}/>

      <Input
        id="price" 
        element="input" 
        type="number" 
        label="Product Price"
        validators={[VALIDATOR_REQUIRE()]}  
        errorText="Please enter a vaild price"
        onInput={inputHandler}/>

        <Input
        id="image"
        element="input"
        type="file"
        label="Product Image"
        validators={[VALIDATOR_FILE()]}
        errorText="please choose an image"
        onInput={inputHandler}/>

      <Button type="submit" disabled={!formState.isValid}>ADD PRODUCT</Button>
    </form>
    </React.Fragment>
  )
}

export default NewProduct