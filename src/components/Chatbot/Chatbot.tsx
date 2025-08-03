"use client";

// Import library dan komponen yang dibutuhkan
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Send, X, Minimize2, Maximize2, Bot, User } from "lucide-react";
import { initialChatMessages } from "@/lib/mock/initialChatMessages";
import { motion, AnimatePresence } from "framer-motion";
import Lottie from "lottie-react";
import botAnimation from "@/../public/animations/Animation-Bot.json";

// Tipe data untuk pesan chat
export interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  category?: string;
}

// Komponen avatar bot
function BotAvatar() {
  return (
    <div className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 sm:w-9 sm:h-9">
      <div className="rounded-full bg-sky-100 dark:bg-sky-900/50 border border-sky-200 dark:border-sky-700 p-1.5 flex items-center justify-center">
        <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-sky-600 dark:text-sky-400" />
      </div>
    </div>
  );
}

// Komponen avatar user
function UserAvatar() {
  return (
    <div className="relative flex shrink-0 overflow-hidden rounded-full w-8 h-8 sm:w-9 sm:h-9">
      <div className="rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 p-1.5 flex items-center justify-center">
        <User className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-400" />
      </div>
    </div>
  );
}

// Komponen indikator bot sedang mengetik
function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.9 }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
        scale: { type: "spring", stiffness: 300, damping: 25 },
      }}
      className="flex gap-3"
    >
      <BotAvatar />
      <div className="flex flex-col">
        <span className="text-xs font-medium text-sky-600 dark:text-sky-400 mb-2">
          TuagusBot
        </span>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.1,
            type: "spring",
            stiffness: 200,
            damping: 20,
          }}
          className="relative flex items-center gap-3 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-750 rounded-2xl rounded-tl-md px-4 py-3 shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
        >
          {/* Titik-titik animasi mengetik */}
          <div className="flex gap-1.5 relative z-10">
            <motion.div
              className="w-2.5 h-2.5 bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-400 dark:to-sky-500 rounded-full shadow-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-400 dark:to-sky-500 rounded-full shadow-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.2,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="w-2.5 h-2.5 bg-gradient-to-r from-sky-500 to-sky-600 dark:from-sky-400 dark:to-sky-500 rounded-full shadow-sm"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                repeat: Number.POSITIVE_INFINITY,
                delay: 0.4,
                ease: "easeInOut",
              }}
            />
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-300 font-medium relative z-10">
            TuagusBot is typing...
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

// Komponen utama Chatbot
export default function Chatbot() {
  // State untuk membuka/menutup chat, minimisasi, daftar pesan, input, dan loading
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialChatMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref untuk scroll ke bawah chat dan fokus input
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll otomatis ke bawah setiap ada pesan baru
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fokus ke input saat chat dibuka dan tidak diminimize
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Fungsi untuk mengirim pesan
  const sendMessage = async (messageText?: string) => {
    const textToSend = messageText || input.trim();
    if (!textToSend) return;

    setLoading(true);
    // Buat pesan user
    const userMessage: Message = {
      id: Date.now(),
      text: textToSend,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");

    try {
      // Kirim pesan ke API
      const res = await fetch("/api/public/groq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      // Buat pesan balasan bot
      const botMessage: Message = {
        id: Date.now() + 1,
        text:
          data.reply ||
          "I apologize, but I couldn't process your request. Please try again! 😅",
        sender: "bot",
        timestamp: new Date(),
        category: data.category,
      };

      setMessages((msgs) => [...msgs, botMessage]);
    } catch (error) {
      // Jika error, tampilkan pesan error dari bot
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "Oops! 😅 I'm having some technical difficulties. Please try again in a moment, or feel free to contact Tuagus directly at ptaguss2@gmail.com! 🙏",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((msgs) => [...msgs, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi submit form input
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  // Fungsi untuk memformat pesan agar mendukung URL dan bold markdown
  const formatMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const boldRegex = /\*\*([^\*]+)\*\*/g;

    // Pisahkan berdasarkan URL
    const parts = text.split(urlRegex);

    return parts.map((part, i) => {
      if (urlRegex.test(part)) {
        // Jika bagian adalah URL, render sebagai link
        return (
          <a
            key={`url-${i}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 underline decoration-2 underline-offset-2 transition-colors duration-200 font-medium cursor-pointer"
          >
            {part}
          </a>
        );
      } else {
        // Proses bold markdown pada bagian non-URL
        const subParts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        boldRegex.lastIndex = 0;
        while ((match = boldRegex.exec(part)) !== null) {
          if (match.index > lastIndex) {
            subParts.push(part.substring(lastIndex, match.index));
          }
          subParts.push(
            <strong key={`bold-${i}-${match.index}`} className="font-bold">
              {match[1]}
            </strong>
          );
          lastIndex = boldRegex.lastIndex;
        }
        if (lastIndex < part.length) {
          subParts.push(part.substring(lastIndex));
        }
        return subParts.length > 0 ? subParts : part;
      }
    });
  };

  // Jika chat belum dibuka, tampilkan tombol bulat di kanan bawah
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
        <motion.button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 active:bg-sky-800 dark:active:bg-sky-700 text-white rounded-full shadow-lg hover:shadow-xl dark:shadow-sky-900/20 dark:hover:shadow-sky-900/30 flex items-center justify-center overflow-hidden cursor-pointer transition-colors duration-200"
          aria-label="Open TuagusBot Chat"
          whileHover={{
            scale: 1.05,
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            duration: 0.6,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            <Lottie
              animationData={botAnimation}
              loop={true}
              style={{ width: "48px", height: "48px" }}
            />
          </motion.div>
        </motion.button>
      </div>
    );
  }

  // Tampilan utama chat ketika dibuka
  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
      <AnimatePresence mode="wait">
        <motion.div
          key="chatbot"
          initial={{
            scale: 0,
            opacity: 0,
            y: 20,
          }}
          animate={{
            scale: 1,
            opacity: 1,
            y: 0,
          }}
          exit={{
            scale: 0.8,
            opacity: 0,
            y: 20,
          }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
            scale: {
              type: "spring",
              stiffness: 80,
              damping: 12,
              mass: 0.5,
            },
            opacity: {
              duration: 0.3,
              ease: "easeOut",
            },
            y: {
              type: "spring",
              stiffness: 100,
              damping: 15,
            },
          }}
          className={`bg-white dark:bg-slate-900 rounded-2xl shadow-2xl dark:shadow-black/20 border border-slate-200 dark:border-slate-700 overflow-hidden ${
            isMinimized ? "w-80 sm:w-96" : "w-80 sm:w-96"
          } max-w-[calc(100vw-2rem)] max-h-[calc(100vh-4rem)]`}
        >
          {/* Header chat */}
          <motion.div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 relative">
            {/* Border animasi jika chat diminimize */}
            {isMinimized && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-sky-200 via-sky-300 to-sky-200 dark:from-sky-700 dark:via-sky-600 dark:to-sky-700 p-[2px]"
              >
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-xl" />
              </motion.div>
            )}

            {/* Info bot dan status online */}
            <div className="flex items-center gap-3 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <BotAvatar />
              </motion.div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  TuagusBot
                </h3>
                <div className="flex items-center gap-1.5">
                  <motion.div
                    className="w-2 h-2 bg-green-400 dark:bg-green-500 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    AI Assistant • Online
                  </p>
                </div>
              </div>
            </div>
            {/* Tombol minimize dan close chat */}
            <div className="flex items-center gap-1 relative z-10">
              <motion.button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 cursor-pointer"
                aria-label={isMinimized ? "Maximize chat" : "Minimize chat"}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: isMinimized ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {isMinimized ? (
                    <Maximize2 className="w-4 h-4 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400" />
                  ) : (
                    <Minimize2 className="w-4 h-4 text-slate-600 dark:text-slate-300 hover:text-sky-600 dark:hover:text-sky-400" />
                  )}
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 cursor-pointer"
                aria-label="Close chat"
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400" />
              </motion.button>
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {!isMinimized && (
              <motion.div
                key="chat-content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1],
                  opacity: { duration: 0.3 },
                }}
                className="overflow-hidden"
              >
                {/* Container pesan chat */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-900/50 h-[380px] sm:h-[480px] scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  <AnimatePresence>
                    {messages.map((msg, index) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.03,
                          ease: [0.4, 0, 0.2, 1],
                        }}
                        className={`flex gap-3 ${
                          msg.sender === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar bot/user */}
                        {msg.sender === "bot" ? <BotAvatar /> : <UserAvatar />}
                        <div
                          className={`max-w-[85%] sm:max-w-[80%] ${
                            msg.sender === "user"
                              ? "bg-sky-600 dark:bg-sky-600 text-white rounded-2xl rounded-tr-md shadow-lg"
                              : "bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-2xl rounded-tl-md shadow-sm border border-slate-200 dark:border-slate-700"
                          } px-4 py-3`}
                        >
                          {/* Nama bot pada pesan bot */}
                          {msg.sender === "bot" && (
                            <div className="text-xs font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1">
                              <Bot className="w-3 h-3" />
                              TuagusBot
                            </div>
                          )}
                          {/* Isi pesan yang sudah diformat */}
                          <div className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                            {formatMessageText(msg.text)}
                          </div>
                          {/* Waktu pesan */}
                          <div
                            className={`text-xs mt-2 opacity-70 ${
                              msg.sender === "user"
                                ? "text-sky-100"
                                : "text-slate-500 dark:text-slate-400"
                            }`}
                          >
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {/* Indikator bot sedang mengetik */}
                  <AnimatePresence>
                    {loading && <TypingIndicator />}
                  </AnimatePresence>
                  {/* Ref untuk scroll ke bawah */}
                  <div ref={chatEndRef} />
                </div>

                {/* Bagian input pesan */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="p-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-b-3xl"
                >
                  <form
                    onSubmit={handleSubmit}
                    className="flex sm:flex-nowrap flex-wrap gap-3 w-full"
                  >
                    <motion.input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about Tuagus..."
                      disabled={loading}
                      className="flex-1 min-w-0 max-w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 focus:border-sky-300 dark:focus:border-sky-600 transition-all duration-300 disabled:opacity-50 shadow-sm cursor-text"
                      whileFocus={{ scale: 1.01 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    />
                    {/* Tombol kirim pesan */}
                    <motion.button
                      type="submit"
                      disabled={loading || !input.trim()}
                      className="px-4 py-3 bg-sky-600 hover:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-2xl transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center min-w-[52px] max-w-full shadow-lg hover:shadow-xl cursor-pointer"
                      aria-label="Send message"
                      whileHover={{ scale: 1.05, rotate: 5 }}
                      whileTap={{ scale: 0.95, rotate: -5 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 25,
                      }}
                    >
                      <Send className="w-4 h-4" />
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
