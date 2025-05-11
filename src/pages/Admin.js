import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <h1>Admin Panel</h1>
      <p>Manage products, view sales reports, and more.</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
};

export default Admin;
