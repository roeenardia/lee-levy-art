import React, {useState} from 'react';
import { useParams } from 'react-router-dom';

const Cart = () => {
    //let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    let [cartItems, SetCartItems] = useState(JSON.parse(localStorage.getItem('cart') || []));
    let {id} = useParams();
    
    //console.log(cartProducts);
    const SetCartProducts = (product) =>{
        console.log(product)
        localStorage.setItem('cart', JSON.stringify(product))
        SetCartItems(product);       
    }

    const RemoveProduct = (product) =>{ 
       
    }

  return (
    <div>   
    <div>
        
        {cartItems.map((product, index) =>{
            return(
                <div key ={index}>
                    <span> {product.productName}</span><br/>
                    <span>{product.productPrice}</span><br/>
                    <button onClick={RemoveProduct}>X</button>
                    {/* <img src={product.image}/> */}
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Cart