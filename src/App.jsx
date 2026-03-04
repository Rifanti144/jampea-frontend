import { useLocation } from "react-router-dom";
import AppRouter from "./router/AppRouter";
import ChatbotButton from "./components/chatbot/ChatbotButton";
import Header from "./components/layout/Header";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />

      {/* Padding hanya untuk halaman selain Home */}
      <main className={isHome ? "" : "pt-20"}>
        <AppRouter />
      </main>

      <ChatbotButton />
    </div>
  );
}

export default App;