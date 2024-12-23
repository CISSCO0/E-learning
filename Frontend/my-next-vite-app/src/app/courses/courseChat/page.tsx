"use client";
import { useState, useEffect } from "react";

interface Chat {
  users: string[];
  content: string;
  date: string;
}

export default function CourseChatsPage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const [chats, setChats] = useState<Chat[]>([]);
  const [newChatContent, setNewChatContent] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        
        const response = await fetch(`http://localhost:3000/courses/676837ac7c9b0d09455a1ccc/chats`);
        if (!response.ok) throw new Error("Failed to fetch chats");
        const data: Chat[] = await response.json();
        setChats(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchChats();
  }, [courseId]);

  const createChat = async () => {
    try {
      const newChat: Chat = {
        users: ["user1", "user2"], // Replace with actual user IDs
        content: newChatContent,
        date: new Date().toISOString(),
      };

      const response = await fetch(`http://localhost:3000/courses/${courseId}/chats`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newChat),
      });

      if (!response.ok) throw new Error("Failed to create chat");
      const updatedChats = await response.json();
      setChats(updatedChats);
      setNewChatContent("");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="p-6">
      <h1>Chats for Course {courseId}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="New Chat Content"
        value={newChatContent}
        onChange={(e) => setNewChatContent(e.target.value)}
      />
      <button onClick={createChat}>Add Chat</button>
      <ul>
        {chats.map((chat, idx) => (
          <li key={idx}>
            <p>{chat.content}</p>
            <small>{chat.date}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
