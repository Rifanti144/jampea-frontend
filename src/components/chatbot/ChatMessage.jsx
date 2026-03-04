import ReactMarkdown from "react-markdown";

export default function ChatMessage({ sender, text }) {
    const isUser = sender === "user";

    return (
        <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`px-5 py-3 rounded-2xl max-w-xs text-sm leading-relaxed whitespace-pre-line
                ${isUser
                    ? "bg-gradient-to-r from-purple-600 to-blue-500 text-white"
                    : "bg-gray-100 text-gray-800 shadow-sm"
                }`}
            >
                <ReactMarkdown
                    components={{
                        p: ({ children }) => <p className="mb-2">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                        ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                        li: ({ children }) => <li className="mb-1">{children}</li>,
                    }}
                >
                    {text}
                </ReactMarkdown>
            </div>
        </div>
    );
}