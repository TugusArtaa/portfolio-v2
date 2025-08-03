interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export const initialChatMessages: Message[] = [
  {
    id: 1,
    text: "👋 Hello there! I'm TuagusBot, Tuagus friendly AI assistant. Welcome to Tuagus Artaa portfolio! ✨",
    sender: "bot" as const,
    timestamp: new Date(),
  },
  {
    id: 2,
    text: "I'd be delighted to help you learn more about Tuagus! 😊 Feel free to ask about his experience, skills, projects, or how to get in touch. What would you like to know? 🤔",
    sender: "bot" as const,
    timestamp: new Date(),
  },
];
