import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {ProductsData} from '../../ProductsData';
import Input from '../../Shared/FormElements/Input';
import Button from '../../Shared/FormElements/Button';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../Shared/util/validators';
import { useForm } from '../../Shared/Hooks/Form-Hook';


const UpdateProduct = () => {
    const [isLoading, setIsLoading] = useState(true);
    let {id} = useParams();
    // const [product, SetProduct] = useState(null);
    // useEffect(() => {
    //     let product = ProductsData.find(p => p.id == id);
    //     console.log(product);
    //     SetProduct(product);
    // },[])
    //let idinifiProduct = ProductsData.find(p => p.id == id);
    const [formState, inputHandler, setFormData] = useForm({
        name:{
            value: "",
            isValid: false
        },
        price:{
            value: "",
            isValid: false
        }
    }, false);

    let idinifiProduct = ProductsData.find(p => p.id == id);
    //console.log(idinifiProduct);
    useEffect(() => {
        if(idinifiProduct){
            setFormData({
                name:{
                    value: idinifiProduct.name,
                    isValid: true
                },
                price:{
                    value: idinifiProduct.price,
                    isValid: true
            }}, true);
        }
        setIsLoading(false);
    }, [setFormData, idinifiProduct]);
    

    const productUpdateSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(formState.inputs);
    };

    if(!idinifiProduct){
        return(
            <div>
                <h2>Could not find product</h2>
            </div>
        )
    }

    if (isLoading){
        return(
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }

  return (  
    <form onSubmit={productUpdateSubmitHandler}>
        <Input  
            id="name" 
            element="input" 
            type="text" 
            label="Product Name" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid name."
            onInput={inputHandler}
            initialVlaue={formState.inputs.name.value}
            initialValid={formState.inputs.name.isValid}/>

        <Input  
            id="price" 
            element="input" 
            type="number" 
            label="Product Price" 
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid price."
            onInput={inputHandler}
            initialVlaue={formState.inputs.price.value}
            initialValid={formState.inputs.price.isValid}/>

        <Button type="submit" disabled={!formState.isValid}>UPDATE PRODUCT</Button>
    </form>
  )
}

export default UpdateProduct