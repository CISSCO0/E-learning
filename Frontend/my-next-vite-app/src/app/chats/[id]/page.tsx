
"use client"
import Chat from '../chat.interface';
import ChatMessage from '../ChatMessage.interface';
import  React from 'react'; // For unwrapping promise params in Next.js

export default function ChatDetailsPage({
  params,
}: {
  params: Promise<{ id : string }>;
}) {
  const { id } = React.use(params);

  const [chat, setChat] =  React.useState<Chat | null>(null);
  const [messages, setMessages] =  React.useState<ChatMessage[]>([]);
  const [error, setError] =  React.useState<string | null>(null);

  // Fetch the chat details by ID
  React.useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        
        const response = await fetch(`http://localhost:5000/chats/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch chat details");
        }
        const fetchedChat: Chat = await response.json();
        setChat(fetchedChat);

        // Fetch messages for this chat using the message ids
        const fetchMessages = async () => {
          const fetchedMessages: ChatMessage[] = [];
          for (const message of fetchedChat.messages) {
            //alert(message._id)
            const messageResponse = await fetch(
              `http://localhost:5000/chat-messages/${message._id}`
            );
            
            if (messageResponse.ok) {
              const messageData: ChatMessage = await messageResponse.json();
              fetchedMessages.push(messageData);
            } else {
              console.error('Failed to fetch message with ID:', message._id);
            }
          }
          setMessages(fetchedMessages);
        };

        fetchMessages();
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchChatDetails();
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Chat Details</h1>
      {error && <p className="text-red-500">{error}</p>}

      {chat ? (
        <div className="w-full max-w-4xl space-y-4">
          <div className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Chat ID: {chat._id}</h2>
            <p className="text-lg">Participants: {chat.users.join(', ')}</p>
            <p className="text-lg">Content: {chat.content}</p>
            <p className="text-sm text-gray-400">Date: {new Date(chat.date).toLocaleString()}</p>
          </div>

          {/* Display Messages */}
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-lg">No messages found for this chat.</p>
            ) : (
              messages.map((message) => (
                <div
                  key={message._id}
                  className="bg-[#1f1f1f] p-6 rounded-lg shadow-lg"
                >
                  <p className="text-lg font-bold">Message ID: {message._id}</p>
                  <p className="text-lg">Sender: {message.senderId}</p>
                  <p className="text-lg">Content: {message.content}</p>
                  <p className="text-sm text-gray-400">Date: {new Date(message.date).toLocaleString()}</p>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <p className="text-lg">Loading chat details...</p>
      )}
    </div>
  );
}
