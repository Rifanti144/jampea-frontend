import { useState, useEffect } from "react";
import ChatbotPopup from "./ChatbotPopup";

export default function ChatbotButton() {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 Listen event dari HeroSection
  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsOpen(true);
    };

    window.addEventListener("openChatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("openChatbot", handleOpenChatbot);
    };
  }, []);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full 
                   bg-gradient-to-r from-purple-600 to-blue-500
                   text-white text-2xl shadow-2xl
                   flex items-center justify-center
                   hover:scale-110 transition-all duration-300"
      >
        💬
      </button>

      {/* Popup */}
      {isOpen && <ChatbotPopup />}
    </>
  );
}