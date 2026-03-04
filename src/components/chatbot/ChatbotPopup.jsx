import { useState, useEffect, useRef } from "react";
import { sendMessage } from "../../api/chatbotApi";
import ChatMessage from "./ChatMessage";

export default function ChatbotPopup() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Halo 👋 Saya AI Jampea 🌴\n\nAda yang ingin kamu ketahui tentang Pulau Jampea?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userText = input.trim();

    // Tambah pesan user
    setMessages(prev => [
      ...prev,
      { sender: "user", text: userText }
    ]);

    setInput("");
    setLoading(true);
    setIsTyping(true);

    try {
      const response = await sendMessage(userText);

      setMessages(prev => [
        ...prev,
        { sender: "bot", text: response.reply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          sender: "bot",
          text: "Maaf, sepertinya ada gangguan server. Coba lagi sebentar ya 🙂"
        }
      ]);
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <div
      className="
        fixed bottom-28 right-8 w-96
        z-[9999]
        bg-white/95 dark:bg-gray-800/95
        backdrop-blur-md
        rounded-[30px]
        shadow-[0_20px_60px_rgba(0,0,0,0.25)]
        p-6
        transition-all duration-300
      "
    >
      {/* Message Area */}
      <div className="h-64 overflow-y-auto space-y-3 mb-4 pr-2">
        {messages.map((msg, index) => (
          <ChatMessage key={index} {...msg} />
        ))}

        {isTyping && (
          <div className="text-gray-400 text-sm italic animate-pulse">
            AI Jampea sedang mengetik...
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          placeholder="Tanya tentang Jampea..."
          disabled={loading}
          className="
            flex-1 rounded-full border-2 border-purple-400
            px-5 py-3 outline-none
            focus:ring-2 focus:ring-purple-500
            transition-all
            disabled:opacity-50
          "
        />

        <button
          onClick={handleSend}
          disabled={loading}
          className="
            bg-gradient-to-r from-purple-600 to-blue-500
            text-white px-5 rounded-full
            hover:opacity-90 transition-all
            disabled:opacity-50
          "
        >
          {loading ? "..." : "Kirim"}
        </button>
      </div>
    </div>
  );
}