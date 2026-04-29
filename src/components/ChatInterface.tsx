import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../i18n';


interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatInterfaceProps {
  initialContext?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ initialContext }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { pick } = useI18n();

  const text = pick({
    en: {
      chartAwarePrefix: 'I can use the structured BaZi chart context from your reading above. ',
      unavailable: 'The live chat service is currently unavailable, but the reading above already includes your Four Pillars, Ten Gods, hidden stems, and Five Elements distribution. Use those sections as the reference point for questions about career, relationships, timing, and element balance.',
      error: 'I apologize, but the chat service is currently unavailable. Please refer to your detailed analysis above for insights about your reading.',
      placeholder: 'Type your message...',
      sending: 'Sending...',
      send: 'Send',
    },
    'zh-CN': {
      chartAwarePrefix: '我会以上方结构化八字命盘作为上下文。 ',
      unavailable: '实时聊天服务暂时不可用，但上方解读已经包含四柱、十神、藏干和五行分布。你可以把这些部分作为事业、关系、时间点和五行平衡问题的参考。',
      error: '抱歉，聊天服务暂时不可用。请先参考上方的详细命盘分析。',
      placeholder: '输入你的问题...',
      sending: '发送中...',
      send: '发送',
    },
    'zh-TW': {
      chartAwarePrefix: '我會以上方結構化八字命盤作為上下文。 ',
      unavailable: '即時聊天服務暫時不可用，但上方解讀已經包含四柱、十神、藏干和五行分布。你可以把這些部分作為事業、關係、時間點和五行平衡問題的參考。',
      error: '抱歉，聊天服務暫時不可用。請先參考上方的詳細命盤分析。',
      placeholder: '輸入你的問題...',
      sending: '傳送中...',
      send: '傳送',
    },
  });

  useEffect(() => {
    if (initialContext) {
      setMessages([
        {
          role: 'system',
          content: initialContext
        }
      ]);
    }
  }, [initialContext]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Mock response since API is not available
      await new Promise(resolve => setTimeout(resolve, 1000));
      const chartAwarePrefix = initialContext
        ? text.chartAwarePrefix
        : '';
      const assistantMessage: Message = {
        role: 'assistant',
        content: `${chartAwarePrefix}${text.unavailable}`
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error in chat:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: text.error
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="glass-panel flex h-[600px] flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.filter((message) => message.role !== 'system').map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.role === 'user'
                  ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/20'
                  : 'glass-inset text-slate-200'
              }`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={text.placeholder}
            className="glass-input flex-1 rounded-lg px-4 py-2 focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="glass-primary-button rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-50"
          >
            {isLoading ? text.sending : text.send}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface; 
