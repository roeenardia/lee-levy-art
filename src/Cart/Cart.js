import React, {useState} from 'react';

const CART = 'cart';
const Cart = () => {
    //let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const [cartProducts, SetCartProducts] = useState(JSON.parse(localStorage.getItem(CART) || '[]'));
    console.log(cartProducts);

    const SetCartItems = (products) =>{
        localStorage.setItem(CART, JSON.stringify(products))
        SetCartItems(products);
    }

    const RemoveProduct = (product) =>{
        SetCartItems(cartProducts.filter((x) => x.id !== product.id));
    }

  return (
    <div>
    
    <div>
        
        {cartProducts.map((product, index) =>{
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