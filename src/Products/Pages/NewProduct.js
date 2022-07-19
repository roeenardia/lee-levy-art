import React from 'react';
import { useCallback, useReducer } from 'react';
import Button from '../../Shared/FormElements/Button';
import Input from '../../Shared/FormElements/Input';
import { VALIDATOR_REQUIRE } from '../../Shared/util/validators';
import './NewProduct.css';

const formReducer = (state, action) =>{
  switch(action.type){
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for(const inputId in state.inputs){
        if(inputId === action.inputId){
          formIsValid = formIsValid && action.isValid;
        } else{
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs:{
          ...state.inputs,
          [action.inputId]: {value: action.value, isValid: action.isValid}
        },
        isValid: formIsValid
      };
    
    default:
      return state;
  }
};

const NewProduct = () => {

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name:{
        value: '',
        isValid: false
      },
      price:{
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id, value, isValid) =>{
    dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId: id})
  }, []);

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