
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Send, 
  User, 
  Bot, 
  Clock, 
  ArrowDown, 
  ChevronDown, 
  Plus, 
  ClipboardCheck, 
  BookOpen,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Copy,
  XCircle
} from "lucide-react";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
}

interface Suggestion {
  id: string;
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hello! I'm your AI Therapy Assistant. I can help you with therapy recommendations, activity suggestions, and answer questions about therapy techniques. How can I assist you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: "s1", text: "Suggest activities for speech therapy for a 5-year-old" },
    { id: "s2", text: "What are effective behavior management techniques?" },
    { id: "s3", text: "How can I improve sensory integration exercises?" },
    { id: "s4", text: "Give me ideas for fine motor skill development" },
  ]);
  
  // Predefined responses
  const responses = {
    speech: "For a 5-year-old in speech therapy, I recommend these activities:\n\n1. **Sound Sorting Games**: Have the child sort pictures based on starting sounds.\n\n2. **Tongue Twisters**: Start with simple ones like \"She sells seashells.\"\n\n3. **Story Sequence Cards**: Have the child arrange cards in order and tell the story.\n\n4. **Rhyming Pairs**: Match pictures that rhyme and practice saying them.\n\n5. **Mirror Work**: Practice making specific sounds while looking in a mirror.\n\nThese activities can be adjusted based on the child's specific speech goals. Would you like more specific activities for particular speech sounds?",
    behavior: "Effective behavior management techniques include:\n\n1. **Positive Reinforcement**: Reward good behavior immediately to strengthen it.\n\n2. **Clear Expectations**: Set and communicate consistent rules and boundaries.\n\n3. **Visual Schedules**: Use picture schedules to help with transitions and routines.\n\n4. **Token Economy**: Implement a system where tokens are earned for good behavior and exchanged for rewards.\n\n5. **Redirection**: Guide the child away from problematic behavior toward more appropriate activities.\n\n6. **First-Then Boards**: \"First complete this task, then you can do the preferred activity.\"\n\nThe key is consistency and positive approaches. Would you like more details about implementing any of these techniques?",
    sensory: "To improve sensory integration exercises, consider these approaches:\n\n1. **Sensory Bins**: Create themed bins with rice, beans, or water beads for tactile exploration.\n\n2. **Obstacle Courses**: Combine jumping, crawling, and balance elements for vestibular and proprioceptive input.\n\n3. **Deep Pressure Activities**: Weighted blankets, compression clothing, or bear hugs can be calming.\n\n4. **Oral-Motor Activities**: Blowing bubbles, using straws, or chewing tools for oral sensory input.\n\n5. **Visual Tracking Games**: Follow moving objects to improve visual processing.\n\n6. **Resistive Activities**: Push/pull games or therapy putty for proprioceptive feedback.\n\nAlways ensure activities match the child's sensory profile - avoid overwhelming them. Would you like some specific examples tailored to a particular sensory need?",
    motor: "For fine motor skill development, try these activities:\n\n1. **Bead Threading**: Start with larger beads and gradually decrease size as skills improve.\n\n2. **Playdough Manipulation**: Rolling, pinching, and cutting playdough strengthens hand muscles.\n\n3. **Scissors Skills**: Begin with thicker paper and progress to more complex cutting patterns.\n\n4. **Tweezers Activities**: Pick up small objects (pom-poms, cereal) with tweezers.\n\n5. **Lacing Cards**: Develop hand-eye coordination and bilateral coordination.\n\n6. **Finger Painting**: Promotes finger isolation and sensory exploration.\n\n7. **Drawing in Sand/Shaving Cream**: Tactile writing practice before using pencil and paper.\n\nThese activities can be made into games to keep the child engaged. Would you like more activity ideas or adaptations for specific age groups?"
  };
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI response with a delay
    setTimeout(() => {
      let responseContent = "I'm not sure how to help with that specific query. Could you provide more details or ask about a specific therapy type like speech, behavior, sensory integration, or motor skills?";
      
      // Check for keyword matches
      if (input.toLowerCase().includes("speech") || input.toLowerCase().includes("language") || input.toLowerCase().includes("articulation")) {
        responseContent = responses.speech;
      } else if (input.toLowerCase().includes("behavior") || input.toLowerCase().includes("management") || input.toLowerCase().includes("conduct")) {
        responseContent = responses.behavior;
      } else if (input.toLowerCase().includes("sensory") || input.toLowerCase().includes("integration")) {
        responseContent = responses.sensory;
      } else if (input.toLowerCase().includes("motor") || input.toLowerCase().includes("fine") || input.toLowerCase().includes("gross")) {
        responseContent = responses.motor;
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      // Generate new suggestions based on context
      setSuggestions([
        { id: "s1", text: "How do I adapt these for a child with autism?" },
        { id: "s2", text: "What materials do I need for these activities?" },
        { id: "s3", text: "How often should these exercises be practiced?" },
        { id: "s4", text: "Can you explain how to track progress?" },
      ]);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    
    // Focus the textarea after setting the suggestion
    const textarea = document.getElementById("message-input") as HTMLTextAreaElement;
    if (textarea) {
      textarea.focus();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content: "Hello! I'm your AI Therapy Assistant. I can help you with therapy recommendations, activity suggestions, and answer questions about therapy techniques. How can I assist you today?",
        sender: "ai",
        timestamp: new Date()
      }
    ]);
    
    // Reset suggestions
    setSuggestions([
      { id: "s1", text: "Suggest activities for speech therapy for a 5-year-old" },
      { id: "s2", text: "What are effective behavior management techniques?" },
      { id: "s3", text: "How can I improve sensory integration exercises?" },
      { id: "s4", text: "Give me ideas for fine motor skill development" },
    ]);
    
    toast.success("Chat history cleared");
  };

  const copyMessageToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col relative">
          {/* Chat Interface */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Message History */}
            <div className="flex-1 overflow-y-auto py-4 px-4 md:px-6">
              <div className="max-w-3xl mx-auto space-y-6">
                {messages.map((message) => (
                  <MessageBubble 
                    key={message.id} 
                    message={message} 
                    onCopy={() => copyMessageToClipboard(message.content)}
                  />
                ))}
                
                {isTyping && (
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="rounded-lg rounded-tl-none bg-muted p-3 text-muted-foreground">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce"></div>
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        <div className="h-2 w-2 rounded-full bg-current animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </div>
            
            {/* Quick Suggestions */}
            <div className="border-t border-border bg-card py-2">
              <div className="max-w-3xl mx-auto px-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      onClick={() => handleSuggestionClick(suggestion.text)}
                      className="whitespace-nowrap rounded-full border border-border bg-background px-3 py-1.5 text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {suggestion.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Input Area */}
            <div className="border-t border-border bg-background py-4">
              <div className="max-w-3xl mx-auto px-4">
                <div className="relative">
                  <textarea
                    id="message-input"
                    placeholder="Ask me about therapy techniques, activities, or recommendations..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[80px] w-full resize-none rounded-lg border border-input bg-background px-3 py-2 pr-12 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    rows={3}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className={cn(
                      "absolute bottom-3 right-3 rounded-full p-1 text-muted-foreground transition-colors",
                      input.trim() 
                        ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                        : "bg-muted hover:text-foreground"
                    )}
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mt-2 flex justify-between items-center text-xs text-muted-foreground">
                  <button 
                    className="flex items-center gap-1 hover:text-foreground transition-colors"
                    onClick={clearChat}
                  >
                    <XCircle className="h-3.5 w-3.5" />
                    <span>Clear chat</span>
                  </button>
                  
                  <span className="text-xs text-muted-foreground">
                    AI responses are generated based on therapy best practices
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

interface MessageBubbleProps {
  message: Message;
  onCopy: () => void;
}

function MessageBubble({ message, onCopy }: MessageBubbleProps) {
  const [showActions, setShowActions] = useState(false);
  
  const formatTimestamp = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };
  
  const formatMessage = (content: string) => {
    // Handle markdown-like formatting for AI messages
    if (message.sender === "ai") {
      // Bold text
      content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Italics
      content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
      
      // Lists
      content = content.replace(/(\d+\.\s.*?)(?=\n\d+\.|$)/gs, '<li>$1</li>');
      content = content.replace(/<li>/g, '<ol><li>').replace(/<\/li>/g, '</li></ol>');
      
      // Paragraphs
      content = content.replace(/\n\n/g, '<br/><br/>');
    }
    
    return { __html: content };
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex items-start gap-3",
        message.sender === "user" && "flex-row-reverse"
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className={cn(
        "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full",
        message.sender === "user" 
          ? "bg-muted text-foreground" 
          : "bg-primary text-primary-foreground"
      )}>
        {message.sender === "user" ? (
          <User className="h-4 w-4" />
        ) : (
          <Bot className="h-4 w-4" />
        )}
      </div>
      
      <div className="group relative">
        <div className={cn(
          "max-w-md rounded-lg p-3",
          message.sender === "user" 
            ? "bg-primary text-primary-foreground rounded-tr-none"
            : "bg-muted rounded-tl-none"
        )}>
          {message.sender === "user" ? (
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div 
              className="text-sm prose-sm prose-p:my-1 prose-ol:my-1 prose-li:my-0.5"
              dangerouslySetInnerHTML={formatMessage(message.content)}
            />
          )}
        </div>
        
        <div className={cn(
          "mt-1 flex items-center gap-2 text-xs text-muted-foreground",
          message.sender === "user" && "justify-end"
        )}>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{formatTimestamp(message.timestamp)}</span>
          </div>
          
          <AnimatePresence>
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.1 }}
                className="flex items-center gap-1"
              >
                {message.sender === "ai" && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Feedback received: Helpful");
                      }}
                      className="rounded p-1 hover:bg-background hover:text-foreground transition-colors"
                      title="Mark as helpful"
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toast.success("Feedback received: Not helpful");
                      }}
                      className="rounded p-1 hover:bg-background hover:text-foreground transition-colors"
                      title="Mark as not helpful"
                    >
                      <ThumbsDown className="h-3 w-3" />
                    </button>
                  </>
                )}
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy();
                  }}
                  className="rounded p-1 hover:bg-background hover:text-foreground transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="h-3 w-3" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
