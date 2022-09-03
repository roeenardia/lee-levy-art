import React from 'react';
import Button from '../Shared/FormElements/Button';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <Link to="/"><Button>Edit/Delete Products</Button></Link>
      <Link to="/new-product"><Button>Add New Product</Button></Link>
      <Link to="/messages"> <Button>Show Messages</Button> </Link>
    </div>
  )
}

export default Admin