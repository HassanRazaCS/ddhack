"use client";

import { useChat } from "ai/react";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { ChatMarkdown } from "./chat-markdown";

export function LegalRightsChatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setMessages,
  } = useChat({
    api: "/api/chat",
  });

  const clearChat = () => {
    setMessages([]);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sampleQuestions = [
    "What are my rights during a police stop?",
    "Can police search my phone without a warrant?",
    "What should I do if I&apos;m arrested?",
    "Do I have the right to remain silent?",
    "What are my rights during a protest?",
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-blue-600 shadow-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-xl"
          size="sm"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>

      {/* Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Window */}
          <div className="relative m-4 flex h-[500px] w-[380px] flex-col rounded-lg bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between rounded-t-lg bg-blue-600 px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                  ⚖️
                </div>
                <div>
                  <h3 className="text-sm font-semibold">Legal Rights Assistant</h3>
                  <p className="text-xs text-blue-100">Ask about your legal rights</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={clearChat}
                  disabled={messages.length === 0}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-400 disabled:opacity-50"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-500 transition-colors hover:bg-blue-400"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-3">
              <div className="space-y-3">
                {messages.length === 0 ? (
                  <div className="space-y-3 text-center">
                    <div className="text-sm text-gray-600">
                      👋 Hi! I&apos;m here to help you understand your legal rights.
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-medium text-gray-400">Try asking:</div>
                      {sampleQuestions.slice(0, 3).map((question, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            handleInputChange({
                              target: { value: question },
                            } as React.ChangeEvent<HTMLInputElement>);
                            // Small delay to ensure input is set
                            setTimeout(() => {
                              const form = document.querySelector('form');
                              if (form) {
                                const event = new Event('submit', { bubbles: true, cancelable: true });
                                form.dispatchEvent(event);
                              }
                            }, 10);
                          }}
                          className="block w-full rounded-md bg-gray-50 p-2 text-left text-xs transition-colors hover:bg-gray-100"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 rounded-md bg-yellow-50 p-2 text-xs text-yellow-800">
                      ⚠️ AI can make mistakes. Consult a lawyer for specific legal advice.
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-lg px-3 py-2 text-sm ${
                            message.role === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          {message.role === "user" ? (
                            <div className="whitespace-pre-wrap">{message.content}</div>
                          ) : (
                            <div>
                              <ChatMarkdown>{message.content}</ChatMarkdown>
                              <div className="mt-2 rounded bg-yellow-50 p-1.5 text-xs text-yellow-800">
                                ⚠️ AI advice is educational. Consult a lawyer for specific cases.
                              </div>
                            </div>
                          )}
                          <div
                            className={`mt-1 text-xs ${
                              message.role === "user" ? "text-blue-200" : "text-gray-500"
                            }`}
                          >
                            {formatDate(message.createdAt ?? new Date())}
                          </div>
                        </div>
                      </div>
                    ))}

                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="max-w-[85%] rounded-lg bg-gray-100 px-3 py-2 text-sm">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Input Area */}
            <div className="border-t bg-gray-50 p-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask about your legal rights..."
                  className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-blue-600 px-3 py-2 hover:bg-blue-700 disabled:opacity-50"
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
