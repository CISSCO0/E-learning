"use client"; // Enables hooks in Next.js page components

import Chat from "../../chat.interface";
import { useState, useEffect } from "react";
import { use } from "react"; // Import `use` from React to unwrap promises

// Define DTO interface for TypeScript
interface CreateChatDto {
  users: string[];
  content: string;
  date: Date;
}

export default function UserChatsPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  // Use the `use` hook to unwrap the promise and get access to the userId
  const { userId } = use(params);

  const [chats, setChats] = useState<Chat[]>([]);
  const [newChatContent, setNewChatContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch chats for the user
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/chats/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user chats");
        }
        const data: Chat[] = await response.json();
        setChats(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchChats();
  }, [userId]);

  const createChat = async () => {
    try {
      const chatData: CreateChatDto = {
        users: [userId], // User ID of the current user
        content: newChatContent, // Content for the new chat
        date: new Date(), // Current date for the new chat
      };

      const response = await fetch("http://localhost:5000/chats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chatData),
      });

      if (!response.ok) {
        throw new Error("Failed to create chat");
      }

      const newChat = await response.json();
      setChats((prevChats) => [...prevChats, newChat]);
      setNewChatContent(""); // Clear input
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Chats for User {userId}</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Form to create a new chat */}
      <div className="w-full max-w-4xl mb-6">
        <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg space-y-4">
          <h2 className="text-2xl font-bold">Create a New Chat</h2>
          <input
            type="text"
            placeholder="Enter chat content"
            className="w-full p-2 text-black rounded"
            value={newChatContent}
            onChange={(e) => setNewChatContent(e.target.value)}
          />
          <button
            onClick={createChat}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Chat
          </button>
        </div>
      </div>

      {/* List of chats */}
      {chats.length === 0 ? (
        <p className="text-lg">No chats found for this user.</p>
      ) : (
        <div className="w-full max-w-4xl space-y-4">
          {chats.map((chat) => (
            <div key={chat._id} className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
              <p className="text-lg font-bold">Chat ID: {chat._id}</p>
              <p className="text-lg">Participants: {chat.users.join(", ")}</p>
              <p className="text-lg">Content: {chat.content}</p>
              <p className="text-sm text-gray-400">
                Date: {new Date(chat.date).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
