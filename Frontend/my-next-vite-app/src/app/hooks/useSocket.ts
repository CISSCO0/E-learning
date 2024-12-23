import { useEffect, useRef, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';

const SOCKET_SERVER_URL = 'http://localhost:5000'; // Replace with your actual WebSocket server URL

export function useSocket() {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // Create a new socket connection
    socketRef.current = io(SOCKET_SERVER_URL);

    // Clean up the socket connection on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const sendMessage = useCallback((chatId: string, senderId: string, content: string) => {
    if (socketRef.current) {
      socketRef.current.emit('sendMessage', { chatId, senderId, content, date: new Date() });
    }
  }, []);

  const onReceiveMessage = useCallback((callback: (message: any) => void) => {
    if (socketRef.current) {
      socketRef.current.on('receiveMessage', callback);
    }
  }, []);

  const getChatMessages = useCallback((chatId: string) => {
    if (socketRef.current) {
      socketRef.current.emit('getChatMessages', chatId);
    }
  }, []);

  const onChatMessages = useCallback((callback: (messages: any[]) => void) => {
    if (socketRef.current) {
      socketRef.current.on('chatMessages', callback);
    }
  }, []);

  return { sendMessage, onReceiveMessage, getChatMessages, onChatMessages };
}

