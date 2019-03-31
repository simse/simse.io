import React from 'react';
import { Link } from 'gatsby'

import '../styles/navbar.scss'

const Navbar = ({type}) => (
  <div className={`navbar ${type}`}>
    <div className="logo">
      <h3><Link to="/">Simon Sørensen</Link></h3>
    </div>

    <div className="links">
      <Link to="/">home.</Link>
      <Link to="/labs">labs.</Link>
      <Link to="/blog">blog.</Link>
    </div>
  </div>
)

export default Navbar
