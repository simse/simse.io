import React from 'react';
import Mailto from 'react-protected-mailto'

import '../styles/contact.scss'

const Contact = () => (
  <div className="contact">
    <h2 className="title">contact</h2>

    <div className="contact-methods">
      <div className="method">
        <img src={require('../images/001-email.svg')} alt="Email icon" />

        <h3>Send me an email</h3>

        <Mailto
          className='btn blue'
          email='hello@simse.io'
          headers={
            {subject:'Question about simse.io'}
          } />
      </div>

      <div className="method">
        <img src={require('../images/002-chat.svg')} alt="Chat icon" />

        <h3>Talk to AI-Simon</h3>

        <a className="btn blue" href="https://assistant-chat-eu-de.watsonplatform.net/web/public/fc4efbac-67cc-47bf-9102-b113832fded8">Visit the lab</a>
      </div>
    </div>
  </div>
)

export default Contact
