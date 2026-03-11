import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { X, Send, Bot, User, Mic, MicOff } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface AIAssistantChatProps {
  onClose: () => void;
}

export function AIAssistantChat({ onClose }: AIAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI farming assistant. I can help you with crop advice, pest management, weather insights, and farming best practices. What would you like to know?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const farmingResponses = {
    'weather': 'Based on current weather data, expect moderate temperatures with possible rainfall in 2 days. This is ideal for wheat irrigation. Consider applying fertilizer before the rain.',
    'irrigation': 'For your soil type, I recommend drip irrigation early morning (6-8 AM) or evening (6-8 PM). Water when soil moisture is below 60%. Check soil 2-3 inches deep.',
    'pest': 'Common pests this season include aphids and bollworms. Use neem oil spray (organic) or apply integrated pest management. Monitor crops daily and remove affected leaves.',
    'fertilizer': 'Apply NPK fertilizer in ratio 4:2:1 for cereal crops. Use organic compost every 15 days. Avoid over-fertilization which can attract pests.',
    'harvest': 'Harvest when grain moisture is 14-16%. Early morning harvest is best. Ensure proper drying and storage to prevent fungal growth.',
    'market': 'Current market prices are favorable for wheat and cotton. Consider selling 60% now and storing 40% for better prices next month.',
    'soil': 'For loamy soil, maintain pH 6.0-7.0. Add organic matter regularly. Test soil nutrients every 6 months. Rotate crops to maintain soil health.',
    'crop rotation': 'Ideal rotation: Legumes → Cereals → Cash crops. This improves soil nitrogen and breaks pest cycles. Plan 3-year rotation cycle.',
    'organic': 'Organic farming tips: Use vermicompost, neem cake, and bio-fertilizers. Companion planting with marigold helps control pests naturally.',
    'subsidy': 'Government subsidies available: PM-KISAN, soil health cards, crop insurance. Visit nearest agriculture office or check PM-KISAN portal online.'
  };

  const getResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(farmingResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }

    // Default responses for common questions
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return 'I can help you with: Weather advice, Irrigation guidance, Pest control, Fertilizer recommendations, Harvest timing, Market prices, Soil management, Crop rotation, Organic farming, and Government subsidies. Just ask me anything!';
    }

    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello farmer! How can I assist you with your farming needs today?';
    }

    if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! I\'m always here to help with your farming questions. Happy farming! 🌱';
    }

    return 'I understand you\'re asking about farming. Could you be more specific? I can help with weather, irrigation, pests, fertilizers, harvest, market prices, soil, crop rotation, organic farming, or subsidies.';
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(inputMessage),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        toast.info('Listening... Speak now');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast.error('Voice recognition failed');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      toast.error('Voice recognition not supported');
    }
  };

  const quickQuestions = [
    'How to check soil health?',
    'When to irrigate crops?',
    'Best time for harvest?',
    'Current market prices?',
    'Pest control tips?'
  ];

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col">
        <CardHeader className="bg-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6" />
              <CardTitle>AI Farming Assistant</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-700">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.sender === 'bot' && <Bot className="h-4 w-4 mt-0.5 text-blue-600" />}
                      {message.sender === 'user' && <User className="h-4 w-4 mt-0.5" />}
                      <div>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Questions */}
          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setInputMessage(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask me anything about farming..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleVoiceInput}
                className={isListening ? 'bg-red-100 border-red-300' : ''}
              >
                {isListening ? <MicOff className="h-4 w-4 text-red-600" /> : <Mic className="h-4 w-4" />}
              </Button>
              <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}