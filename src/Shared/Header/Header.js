import React from 'react';
import { Link } from 'react-router-dom';
import Products from '../../Products/Components/Products';
import "./Header.css";


const Header = () => {


  return (
    <div className='header'>
      <div>
          <div className='cart'>עגלה</div>
      </div>
      <Link to="/">
        <div className='lee-levy'>Lee Levy</div>
        <div className='artist'>Artist</div>
      </Link>
    </div>
  )
}

export default Header