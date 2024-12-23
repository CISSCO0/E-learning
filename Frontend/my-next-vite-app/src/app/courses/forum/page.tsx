// 'use client'

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { fetchApi } from '@/app/utils/api'

// interface Thread {
//   _id: string;
//   title: string;
// }

// export default function ForumsPage() {
//   const [threads, setThreads] = useState<Thread[]>([])

//   useEffect(() => {
//     fetchThreads()
//   }, [])

//   const fetchThreads = async () => {
//     try {
//       const data = await fetchApi('/threads')
//       setThreads(data)
//     } catch (error) {
//       console.error('Failed to fetch threads:', error)
//     }
//   }

//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Forums</h1>
//       <ul className="space-y-2">
//         {threads.map(thread => (
//           <li key={thread._id} className="border p-4 rounded">
//             <Link href={`/forums/${thread._id}`}>
//               <div className="font-bold">{thread.title}</div>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

