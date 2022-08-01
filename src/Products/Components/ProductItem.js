import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Button from '../../Shared/FormElements/Button';
import { AuthContext } from '../../Shared/Context/auth-context';

import './ProductItem.css';

const ProductItem = (props) => {

  const auth = useContext(AuthContext);

  const deleteHandler = () =>{
    console.log('DELETING...')
  }

  return (   
      <div className='product-item'>
        <div className='product-item_content'>
            <Link to={`/${props.id}/${props.name}`}>
            <div className='product-item_image'>
                <img src={props.image} alt={props.name}/>
            </div>
            <div className='product-item_info'>
                <h2>{props.name}</h2>
                <h3>{props.price}</h3>
            </div>
            </Link>
            {auth.isLoggedIn && <Link to={`/update-product/${props.id}`}> <Button>Edit</Button> </Link>}
            {!auth.isLoggedIn && <Button>הוסף לעגלה</Button> }
            {auth.isLoggedIn && <Button danger onClick={deleteHandler}>Delete</Button> }
        </div>
      </div>
    
  )
}
export default ProductItem