import React from 'react';
import "./Footer.css";
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <div>
        <div className='footer'>
            <div className='footer-container'>
                <div className='contact'><Link to="/contact">CONTACT</Link></div>
                <div className='facebook'>facebook</div>
                <div className='instagram'>instagram</div>
                <div className='about'>ABOUT</div>
            </div>
        </div>
    </div>
  )
}

export default Footer