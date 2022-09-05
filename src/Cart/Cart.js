import React, {useState} from 'react';


const Cart = () => {
    //let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    var [cartItems, SetCartItems] = useState(JSON.parse(localStorage.getItem('cart') || '[]'));
    //var [cartItems, SetCartItems] = useState([]);
    
    
    //console.log(cartProducts);
    const SetCartProducts = (product) =>{
        localStorage.setItem('cart', JSON.stringify(product))
        SetCartItems(product);       
    }

    const RemoveProduct = (product) =>{ 
        SetCartProducts(cartItems.filter((x) => x.id !== product.id));
    }

  return (
    <div>   
    <div>
        
        {cartItems.map((product, index) =>{
            return(
                <div key ={index}>
                    <span> {product.productName}</span><br/>
                    <span>{product.productPrice}</span><br/>
                    <button onClick={ () => RemoveProduct(product)}>X</button>
                    {/* <img src={product.image}/> */}
                </div>
            )
        })}
    </div>
    </div>
  )
}

export default Cart