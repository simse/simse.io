import React from 'react';

import '../styles/navbar.scss'

const Navbar = () => (
  <div className="navbar">
    <div className="logo">
      <h3>Simon Sorensen</h3>
    </div>

    <div className="links">
      <a className="active">Home</a>
      <a>Work</a>
    </div>
  </div>
)

export default Navbar
