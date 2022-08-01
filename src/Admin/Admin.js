import React from 'react';
import Button from '../Shared/FormElements/Button';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Link to="/"><Button>Edit/Delete Products</Button></Link>
      <Link to="/new-product"><Button>Add New Product</Button></Link>
      <Button>Show Messages</Button>
    </div>
  )
}

export default Admin