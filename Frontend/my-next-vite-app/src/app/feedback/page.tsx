'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'

// Client Component for the SubmitButton
function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
    >
      {pending ? 'Submitting...' : 'Submit Feedback'}
    </button>
  )
}

// Client Component for the Form
export default function FeedbackPage() {
  const [message, setMessage] = useState('')  // Ensure `setMessage` is properly defined here

  async function handleSubmit(formData: FormData) {
    // Call the Server Action via a fetch request
    const result = await fetch('/api/submit-feedback', {
      method: 'POST',
      body: formData
    })

    if (!result.ok) {
      // If the response is not OK (not status 200), throw an error
      alert('Failed to submit feedback. Please try again.')
      return
    }

    const data = await result.json() // Parse the JSON response

    if (data.success) {
      setMessage(data.message)  // Set the success message here
      alert(data.message) // Using alert instead of toast
    } else {
      alert('Failed to submit feedback. Please try again.') // Using alert for error message
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Provide Your Feedback</h1>
      <form action={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        <div>
          <span className="block text-sm font-medium text-gray-700">Rating</span>
          <div className="mt-2 flex space-x-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex items-center">
                <input
                  type="radio"
                  id={`rating-${value}`}
                  name="rating"
                  value={value.toString()}
                  defaultChecked={value === 3}
                  className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                />
                <label htmlFor={`rating-${value}`} className="ml-2 block text-sm text-gray-700">
                  {value}
                </label>
              </div>
            ))}
          </div>
        </div>
        <SubmitButton />
        {message && <p className="text-green-600 mt-2">{message}</p>}  {/* Display success message */}
      </form>
    </div>
  )
}
