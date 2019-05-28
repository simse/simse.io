import React from 'react';
import {Link} from 'gatsby'

import '../styles/hero.scss'

const Hero = () => (
  <div className="hero">
    <div className="text">
      <h1>SIMON SØRENSEN</h1>
      <h2>Hobby developer</h2>
    </div>

    <div className="buttons">
      <Link className="btn" to="/blog/">Visit the blog</Link>
    </div>
  </div>
)

export default Hero
