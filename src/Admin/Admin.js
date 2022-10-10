import React from "react";
import Button from "../Shared/FormElements/Button";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  return (
    <div className="admin">
      <Link to="/">
        <Button>עריכה/מחיקת מוצרים</Button>
      </Link>

      <Link to="/new-product">
        <Button>מוצר חדש</Button>
      </Link>

      <Link to="/messages">
        <Button>הודעות</Button>
      </Link>

      <Link to="/orders-history">
        <Button>היסטורית הזמנות</Button>
      </Link>
    </div>
  );
};

export default Admin;
