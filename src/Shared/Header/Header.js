import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import Products from '../../Products/Components/Products';
import { AuthContext } from '../Context/auth-context';

import "./Header.css";


const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <div className='header'>
      <div>
          {auth.isLoggedIn && <button onClick={auth.logout}>LOG OUT</button>}
          <Link to="/cart"> <div className='cart'>עגלה</div> </Link>
      </div>
      <Link to="/">
        <div className='lee-levy'>Lee Levy</div>
        <div className='artist'>Artist</div>
      </Link>
    </div>
  )
}

export default Header