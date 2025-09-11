import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Leaf,
  Recycle,
  Lightbulb,
  Heart,
  Zap,
  Globe
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  suggestions?: string[];
}

interface EcoChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const EcoChatbot: React.FC<EcoChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your EcoBot assistant 🌱 I'm here to help you with waste management, sustainability tips, and eco-friendly practices. How can I help you today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "How to segregate waste properly?",
        "Best eco-friendly products",
        "Reduce carbon footprint tips",
        "Recycling guidelines"
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getEcoBotResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Waste segregation queries
    if (input.includes('segregat') || input.includes('separat') || input.includes('sort')) {
      return {
        text: "🗂️ **Waste Segregation Guide:**\n\n**🟢 Green (Wet/Organic):** Food scraps, vegetable peels, garden waste\n**🔵 Blue (Dry/Recyclable):** Paper, plastic bottles, metal cans, glass\n**🔴 Red (Hazardous):** Batteries, electronics, medical waste, chemicals\n**⚫ Black (General):** Non-recyclable items, sanitary waste\n\nProper segregation helps reduce landfill waste by 60% and makes recycling more efficient!",
        suggestions: [
          "What goes in which bin?",
          "Composting tips",
          "Recycling process",
          "Hazardous waste disposal"
        ]
      };
    }

    // Recycling queries
    if (input.includes('recycl') || input.includes('reuse')) {
      return {
        text: "♻️ **Smart Recycling Tips:**\n\n• **Paper:** Remove staples, clean and dry before recycling\n• **Plastic:** Check recycling codes (1-7), clean containers\n• **Glass:** Separate by color, remove caps and lids\n• **Electronics:** Take to certified e-waste centers\n• **Batteries:** Never throw in regular trash, use special collection points\n\n💡 **Creative Reuse Ideas:** Turn glass jars into planters, use old t-shirts as cleaning rags, repurpose cardboard for storage!",
        suggestions: [
          "E-waste disposal centers",
          "DIY upcycling projects",
          "Plastic recycling codes",
          "Paper recycling process"
        ]
      };
    }

    // Carbon footprint queries
    if (input.includes('carbon') || input.includes('footprint') || input.includes('emission')) {
      return {
        text: "🌍 **Reduce Your Carbon Footprint:**\n\n**🚗 Transportation (30%):**\n• Use public transport, bike, or walk\n• Carpool or use electric vehicles\n• Work from home when possible\n\n**⚡ Energy (25%):**\n• Switch to LED bulbs\n• Unplug devices when not in use\n• Use renewable energy sources\n\n**🍽️ Food (20%):**\n• Eat more plant-based meals\n• Buy local and seasonal produce\n• Reduce food waste\n\n**🏠 Home (25%):**\n• Improve insulation\n• Use energy-efficient appliances\n• Reduce water consumption",
        suggestions: [
          "Energy saving tips",
          "Sustainable transportation",
          "Plant-based diet benefits",
          "Home energy audit"
        ]
      };
    }

    // Eco-friendly products
    if (input.includes('eco') || input.includes('green product') || input.includes('sustainable product')) {
      return {
        text: "🌿 **Top Eco-Friendly Product Categories:**\n\n**🧽 Cleaning:** Biodegradable soaps, bamboo scrubbers, vinegar-based cleaners\n**👕 Clothing:** Organic cotton, hemp, recycled polyester\n**🍽️ Kitchen:** Stainless steel straws, beeswax wraps, bamboo utensils\n**🚿 Personal Care:** Solid shampoo bars, bamboo toothbrushes, refillable containers\n**📱 Tech:** Solar chargers, refurbished electronics, energy-efficient devices\n\n✅ **Look for certifications:** ENERGY STAR, EPEAT, Cradle to Cradle, Fair Trade",
        suggestions: [
          "Zero waste kitchen essentials",
          "Sustainable fashion brands",
          "Natural cleaning recipes",
          "Eco-friendly packaging"
        ]
      };
    }

    // Composting queries
    if (input.includes('compost') || input.includes('organic waste')) {
      return {
        text: "🌱 **Composting Made Easy:**\n\n**✅ Green Materials (Nitrogen):**\n• Fruit & vegetable scraps\n• Coffee grounds & tea bags\n• Fresh grass clippings\n• Plant trimmings\n\n**✅ Brown Materials (Carbon):**\n• Dry leaves\n• Paper & cardboard\n• Wood chips\n• Eggshells\n\n**❌ Avoid:** Meat, dairy, oils, pet waste, diseased plants\n\n**🏠 Indoor Options:** Bokashi composting, worm bins, electric composters\n**🌳 Outdoor:** Traditional pile, tumbler, or trench composting\n\n⏰ Ready in 3-6 months with proper maintenance!",
        suggestions: [
          "Indoor composting methods",
          "Troubleshooting compost problems",
          "Using finished compost",
          "Worm composting guide"
        ]
      };
    }

    // Water conservation
    if (input.includes('water') || input.includes('conserv')) {
      return {
        text: "💧 **Water Conservation Strategies:**\n\n**🚿 Bathroom (70% of home use):**\n• Take shorter showers (save 25 gallons)\n• Fix leaky faucets immediately\n• Install low-flow showerheads\n• Use dual-flush toilets\n\n**🍽️ Kitchen:**\n• Run dishwasher only when full\n• Collect pasta water for plants\n• Fix dripping taps\n• Use a bowl to wash fruits/vegetables\n\n**🌿 Garden:**\n• Water early morning or evening\n• Use drip irrigation\n• Plant native, drought-resistant species\n• Collect rainwater\n\n💡 **Smart tip:** A single dripping tap wastes 3,000 gallons per year!",
        suggestions: [
          "Rainwater harvesting",
          "Drought-resistant plants",
          "Greywater systems",
          "Water-efficient appliances"
        ]
      };
    }

    // Plastic reduction
    if (input.includes('plastic') || input.includes('single use')) {
      return {
        text: "🚫 **Reduce Single-Use Plastics:**\n\n**🛍️ Shopping:**\n• Bring reusable bags\n• Choose products with minimal packaging\n• Buy in bulk when possible\n• Opt for glass or metal containers\n\n**🥤 Beverages:**\n• Use refillable water bottles\n• Carry a reusable coffee cup\n• Say no to plastic straws\n• Choose canned over plastic bottles\n\n**🍽️ Food Storage:**\n• Use glass containers\n• Beeswax wraps instead of plastic wrap\n• Silicone bags for freezing\n• Stainless steel lunch boxes\n\n🌊 **Impact:** Every minute, 1 million plastic bottles are purchased globally. Your choices matter!",
        suggestions: [
          "Plastic-free alternatives",
          "Zero waste shopping tips",
          "DIY beeswax wraps",
          "Microplastic reduction"
        ]
      };
    }

    // Energy saving
    if (input.includes('energy') || input.includes('electric') || input.includes('power')) {
      return {
        text: "⚡ **Energy Saving Solutions:**\n\n**💡 Lighting (12% of energy use):**\n• Switch to LED bulbs (75% less energy)\n• Use natural light when possible\n• Install motion sensors\n• Choose warm white LEDs for comfort\n\n**❄️ Heating/Cooling (48% of energy use):**\n• Set thermostat 2°F lower in winter\n• Use programmable thermostats\n• Seal air leaks around windows\n• Regular HVAC maintenance\n\n**📱 Electronics:**\n• Unplug chargers when not in use\n• Use power strips with switches\n• Enable sleep mode on computers\n• Choose ENERGY STAR appliances\n\n💰 **Savings:** These changes can reduce your energy bill by 25-30%!",
        suggestions: [
          "Smart home energy systems",
          "Solar panel installation",
          "Energy audit checklist",
          "Appliance efficiency ratings"
        ]
      };
    }

    // General sustainability
    if (input.includes('sustain') || input.includes('environment') || input.includes('green living')) {
      return {
        text: "🌍 **Sustainable Living Essentials:**\n\n**🏠 At Home:**\n• Reduce, reuse, recycle in that order\n• Choose quality over quantity\n• Repair instead of replacing\n• Share or borrow items you rarely use\n\n**🛒 Conscious Consumption:**\n• Buy local and seasonal\n• Support ethical brands\n• Choose second-hand when possible\n• Minimize packaging waste\n\n**🌱 Community Impact:**\n• Join local environmental groups\n• Participate in cleanup drives\n• Share knowledge with others\n• Vote for eco-friendly policies\n\n✨ **Remember:** Small consistent actions create big environmental impact over time!",
        suggestions: [
          "Sustainable brands directory",
          "Local environmental groups",
          "Eco-friendly home improvements",
          "Community garden participation"
        ]
      };
    }

    // Default responses for general queries
    const defaultResponses = [
      {
        text: "🌱 I'm here to help with all things eco-friendly! I can assist you with waste management, recycling tips, sustainable living practices, and environmental conservation. What specific topic would you like to explore?",
        suggestions: [
          "Waste segregation guide",
          "Eco-friendly product recommendations",
          "Carbon footprint reduction",
          "Sustainable living tips"
        ]
      },
      {
        text: "♻️ Great question! I specialize in environmental topics like recycling, composting, energy conservation, and sustainable practices. Feel free to ask me about any eco-friendly topic you're curious about!",
        suggestions: [
          "Composting at home",
          "Water conservation methods",
          "Plastic alternatives",
          "Green energy solutions"
        ]
      }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputText.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = getEcoBotResponse(messageText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse.text,
        isBot: true,
        timestamp: new Date(),
        suggestions: botResponse.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-end p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
      
      {/* Chatbot Container */}
      <motion.div
        className="relative w-full max-w-md h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
        initial={{ scale: 0.8, y: 100 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 100 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-eco-500 to-nature-500 p-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">EcoBot Assistant</h3>
                <p className="text-sm text-white/80">Your sustainability guide</p>
              </div>
            </div>
            <motion.button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <X className="h-5 w-5" />
            </motion.button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[400px]">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.isBot 
                      ? 'bg-gradient-to-r from-eco-400 to-nature-400' 
                      : 'bg-gradient-to-r from-blue-400 to-purple-400'
                  }`}>
                    {message.isBot ? (
                      <Leaf className="h-4 w-4 text-white" />
                    ) : (
                      <User className="h-4 w-4 text-white" />
                    )}
                  </div>
                  <div className={`rounded-2xl p-3 ${
                    message.isBot 
                      ? 'bg-gray-100 text-gray-800' 
                      : 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  }`}>
                    <div className="text-sm whitespace-pre-line">{message.text}</div>
                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSendMessage(suggestion)}
                            className="block w-full text-left text-xs bg-white/80 hover:bg-white text-gray-700 px-3 py-2 rounded-lg transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              className="flex justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-eco-400 to-nature-400 rounded-full flex items-center justify-center">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <div className="bg-gray-100 rounded-2xl p-3">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about sustainability, recycling, or eco-friendly tips..."
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-eco-500 focus:border-transparent resize-none"
                rows={1}
                style={{ minHeight: '44px', maxHeight: '100px' }}
              />
            </div>
            <motion.button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim() || isTyping}
              className="p-3 bg-gradient-to-r from-eco-500 to-nature-500 text-white rounded-xl hover:from-eco-600 hover:to-nature-600 disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="h-5 w-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EcoChatbot;