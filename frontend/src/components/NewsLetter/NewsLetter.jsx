import React, { useState } from 'react';
import './NewsLetter.css';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const subscribe = async () => {
    setLoading(true);
    const response = await fetch('http://localhost:5000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (response.status == 200) {
      setEmail('');
      alert('Email sent successfully');
    } else {
      alert('Error sending email');
    }

    setLoading(false);
  }

  return (
    <div className="newsletter">
        <h1>Get Exclusive Offers on Your Email</h1>
        <p>Subscribe to our newsletter and stay updated</p>
        <div>
            <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <button onClick={subscribe} disabled={loading}>{loading ? 'Sending...' : 'Subscribe'}</button>
        </div>
    </div>
  )
}

export default NewsLetter;