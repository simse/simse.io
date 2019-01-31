import React from 'react';
import { Link } from 'gatsby'

import '../styles/navbar.scss'

const Navbar = () => (
  <div className="navbar">
    <div className="logo">
      <h3>Simon Sorensen</h3>
    </div>

    <div className="links">
      <Link to="/">Home</Link>
      <Link to="/labs">Labs</Link>
    </div>
  </div>
)

export default Navbar
