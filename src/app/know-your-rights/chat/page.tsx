"use client";

import { useChat } from "ai/react";
import { ArrowLeft, RotateCcw, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ChatMarkdown } from "~/app/_components/chat-markdown";

export default function ChatPage() {
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
    "What should I do if I'm arrested?",
    "Do I have the right to remain silent?",
    "What are my rights during a protest?",
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-[#68D466] px-4 py-3 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/know-your-rights"
              className="flex items-center justify-center h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
              <Image
                src="/logo.svg"
                alt="Advocado"
                width={20}
                height={23}
                className="h-5 w-auto"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">Advocado AI Assistant</h1>
              <p className="text-sm text-green-100">Ask about your legal rights</p>
            </div>
          </div>
          <Button
            onClick={clearChat}
            disabled={!messages.length}
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-[#5BC659] text-white hover:bg-[#4FB84A] disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className="space-y-6 text-center">
              <div className="text-lg text-gray-600">
                👋 Hi! I&apos;m here to help you understand your legal rights.
              </div>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-500">
                  Try asking:
                </div>
                {sampleQuestions.map((question, idx) => (
                  <Button
                    key={idx}
                    onClick={() => {
                      handleInputChange({
                        target: { value: question },
                      } as React.ChangeEvent<HTMLInputElement>);
                      // Small delay to ensure input is set
                      setTimeout(() => {
                        const form = document.querySelector("form");
                        if (form) {
                          const event = new Event("submit", {
                            bubbles: true,
                            cancelable: true,
                          });
                          form.dispatchEvent(event);
                        }
                      }, 10);
                    }}
                    variant="ghost"
                    className="h-auto w-full justify-start rounded-lg bg-white border border-gray-200 p-3 text-left text-sm transition-colors hover:bg-gray-50 shadow-sm"
                  >
                    {question}
                  </Button>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-yellow-50 p-4 text-sm text-yellow-800 border border-yellow-200">
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
                    className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
                      message.role === "user"
                        ? "bg-[#68D466] text-white"
                        : "bg-white border border-gray-200 text-gray-900 shadow-sm"
                    }`}
                  >
                    {message.role === "user" ? (
                      <div className="whitespace-pre-wrap">
                        {message.content}
                      </div>
                    ) : (
                      <div>
                        <ChatMarkdown>{message.content}</ChatMarkdown>
                        <div className="mt-3 rounded-lg bg-yellow-50 p-2 text-xs text-yellow-800 border border-yellow-200">
                          ⚠️ AI advice is educational. Consult a lawyer for specific cases.
                        </div>
                      </div>
                    )}
                    <div
                      className={`mt-2 text-xs ${
                        message.role === "user"
                          ? "text-green-200"
                          : "text-gray-500"
                      }`}
                    >
                      {formatDate(message.createdAt ?? new Date())}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-lg bg-white border border-gray-200 px-4 py-3 text-sm shadow-sm">
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
      <div className="border-t bg-white p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about your legal rights..."
              className="flex-1 text-base"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-[#68D466] px-4 py-2 hover:bg-[#5BC659] disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}