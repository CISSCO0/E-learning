// 'use client'

// import { useState, useEffect } from 'react'
// import { useParams } from 'next/navigation'
// import { fetchApi } from '@/app/utils/api'



// interface Message {
//   _id: string;
//   senderId: string;
//   content: string;
//   date: string;
// }

// export default function ThreadPage() {
//   const [messages, setMessages] = useState<Message[]>([])
//   const [newMessage, setNewMessage] = useState('')
//   const params = useParams()
//   const threadId = params.id as string

//   useEffect(() => {
//     fetchMessages()
//   }, [threadId])

//   const fetchMessages = async () => {
//     try {
//       const data = await fetchApi(`/thread-messages/thread/${threadId}`)
//       setMessages(data)
//     } catch (error) {
//       console.error('Failed to fetch messages:', error)
//     }
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     try {
//       await fetchApi(`/thread-messages/${threadId}`, {
//         method: 'POST',
//         body: JSON.stringify({
//           senderId: 'current-user-id', // Replace with actual user ID
//           content: newMessage,
//           date: new Date().toISOString(),
//         }),
//       })
//       setNewMessage('')
//       fetchMessages()
//     } catch (error) {
//       console.error('Failed to send message:', error)
//     }
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Thread Messages</h1>
//       <div className="space-y-4 mb-4">
//         {messages.map(message => (
//           <div key={message._id} className="border p-4 rounded">
//             <div className="font-bold">{message.senderId}</div>
//             <div className="text-sm text-gray-500">{new Date(message.date).toLocaleString()}</div>
//             <div>{message.content}</div>
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="flex">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//           className="flex-grow p-2 border rounded-l"
//         />
//         <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-r">Send</button>
//       </form>
//     </div>
//   )
// }

