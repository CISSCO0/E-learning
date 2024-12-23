// types/chat.ts
import ChatMessage from "./ChatMessage.interface";
  export default interface Chat {
    _id: string;
    users: string[];
    content: string;
    date: string;
    messages: ChatMessage[]; // Array of messages with message IDs
  }