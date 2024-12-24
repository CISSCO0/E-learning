'use client'
import './styles/global.css';
import './styles/styles.css';
import './welcome.module.css';
import { useState } from 'react'

export default function Footer() {
  const [feedback, setFeedback] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Feedback submitted:', feedback)
    setFeedback('')
    alert('Thank you for your feedback!')
  }

  return (
    <footer className="footer">
      <div className="container">
        <h3>We value your feedback</h3>
        <form onSubmit={handleSubmit} className="feedback-form">
          <input
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Enter your feedback"
            className="feedback-input"
          />
          <button type="submit" className="submit-button">Submit</button>
        </form>
        <div className="copyright">
          © 2023 EduPlatform. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

