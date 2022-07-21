import React from 'react';
import Button from '../../Shared/FormElements/Button';
import Input from '../../Shared/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';
import './NewProduct.css';


const NewProduct = () => {

  const [formState, inputHandler] = useForm(
    {
      name:{
        value: '',
        isValid: false
      },
      price:{
        value: '',
        isValid: false
      }
    },
    false
  );


  const productSubmitHandler = (event) =>{
    event.preventDefault();
    console.log(formState.inputs); // ****** send to backend *******
  }


  return (
    <form className='product-form' onSubmit={productSubmitHandler}>
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

      <Button type="submit" disabled={!formState.isValid}>ADD PRODUCT</Button>
    </form>
  )
}

export default NewProduct