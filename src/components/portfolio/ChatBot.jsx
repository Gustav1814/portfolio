import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Briefcase, Code, HelpCircle, ArrowRight, Phone } from 'lucide-react';

// Your WhatsApp number (with country code, no + or spaces)
const WHATSAPP_NUMBER = '923132349359';

const CHAT_STEPS = {
    GREETING: 'greeting',
    OPTIONS: 'options',
    COLLECT_COMPANY: 'collect_company',
    COLLECT_FIRST_NAME: 'collect_first_name',
    COLLECT_LAST_NAME: 'collect_last_name',
    COLLECT_EMAIL: 'collect_email',
    COLLECT_PHONE: 'collect_phone',
    COLLECT_MESSAGE: 'collect_message',
    CONNECTING: 'connecting',
    GENERAL: 'general',
};

const BOT_RESPONSES = {
    greeting: "Hi there! 👋 I'm Zeerak's assistant. How can I help you today?",
    options: "Please select an option below:",
    collectCompany: "Great! Let me connect you with Zeerak. What's your company or organization name?",
    collectFirstName: "Thanks! What's your first name?",
    collectLastName: "And your last name?",
    collectEmail: "Perfect! What's your email address?",
    collectPhone: "What's your phone number?",
    collectMessage: "Almost done! Briefly describe what you're looking for:",
    connecting: "Thanks for the details! Click below to start a WhatsApp chat with Zeerak! 💬",
    general: "Feel free to explore the portfolio! Check out Skills, Projects, and Certifications. If you need anything, I'm here!",
};

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [currentStep, setCurrentStep] = useState(CHAT_STEPS.GREETING);
    const [isTyping, setIsTyping] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [visitorData, setVisitorData] = useState({
        company: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
        intent: ''
    });
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setTimeout(() => {
                addBotMessage(BOT_RESPONSES.greeting);
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.options);
                    setCurrentStep(CHAT_STEPS.OPTIONS);
                }, 1000);
            }, 500);
        }
    }, [isOpen]);

    const addBotMessage = (text) => {
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text }]);
            setIsTyping(false);
        }, 800);
    };

    const addUserMessage = (text) => {
        setMessages(prev => [...prev, { type: 'user', text }]);
    };

    const handleOptionClick = (option) => {
        if (option === 'hiring') {
            addUserMessage("I'm looking to hire!");
            setVisitorData(prev => ({ ...prev, intent: '🎯 Hiring Inquiry' }));
            setTimeout(() => {
                addBotMessage(BOT_RESPONSES.collectCompany);
                setCurrentStep(CHAT_STEPS.COLLECT_COMPANY);
            }, 500);
        } else if (option === 'project') {
            addUserMessage("I have a project in mind");
            setVisitorData(prev => ({ ...prev, intent: '💼 Project Inquiry' }));
            setTimeout(() => {
                addBotMessage(BOT_RESPONSES.collectCompany);
                setCurrentStep(CHAT_STEPS.COLLECT_COMPANY);
            }, 500);
        } else if (option === 'general') {
            addUserMessage("Just browsing!");
            setTimeout(() => {
                addBotMessage(BOT_RESPONSES.general);
                setCurrentStep(CHAT_STEPS.GENERAL);
            }, 500);
        }
    };

    const handleInputSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const value = inputValue.trim();
        addUserMessage(value);
        setInputValue('');

        switch (currentStep) {
            case CHAT_STEPS.COLLECT_COMPANY:
                setVisitorData(prev => ({ ...prev, company: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.collectFirstName);
                    setCurrentStep(CHAT_STEPS.COLLECT_FIRST_NAME);
                }, 500);
                break;
            case CHAT_STEPS.COLLECT_FIRST_NAME:
                setVisitorData(prev => ({ ...prev, firstName: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.collectLastName);
                    setCurrentStep(CHAT_STEPS.COLLECT_LAST_NAME);
                }, 500);
                break;
            case CHAT_STEPS.COLLECT_LAST_NAME:
                setVisitorData(prev => ({ ...prev, lastName: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.collectEmail);
                    setCurrentStep(CHAT_STEPS.COLLECT_EMAIL);
                }, 500);
                break;
            case CHAT_STEPS.COLLECT_EMAIL:
                setVisitorData(prev => ({ ...prev, email: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.collectPhone);
                    setCurrentStep(CHAT_STEPS.COLLECT_PHONE);
                }, 500);
                break;
            case CHAT_STEPS.COLLECT_PHONE:
                setVisitorData(prev => ({ ...prev, phone: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.collectMessage);
                    setCurrentStep(CHAT_STEPS.COLLECT_MESSAGE);
                }, 500);
                break;
            case CHAT_STEPS.COLLECT_MESSAGE:
                setVisitorData(prev => ({ ...prev, message: value }));
                setTimeout(() => {
                    addBotMessage(BOT_RESPONSES.connecting);
                    setCurrentStep(CHAT_STEPS.CONNECTING);
                }, 500);
                break;
            default:
                break;
        }
    };

    const openWhatsApp = () => {
        const whatsappMessage = encodeURIComponent(
            `*${visitorData.intent}*\n\n` +
            `--------------------\n` +
            `Company: ${visitorData.company}\n` +
            `Name: ${visitorData.firstName} ${visitorData.lastName}\n` +
            `Email: ${visitorData.email}\n` +
            `Phone: ${visitorData.phone}\n` +
            `--------------------\n\n` +
            `Message:\n${visitorData.message}`
        );
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`, '_blank');
    };

    const resetChat = () => {
        setMessages([]);
        setCurrentStep(CHAT_STEPS.GREETING);
        setVisitorData({
            company: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
            intent: ''
        });
        setTimeout(() => {
            addBotMessage(BOT_RESPONSES.greeting);
            setTimeout(() => {
                addBotMessage(BOT_RESPONSES.options);
                setCurrentStep(CHAT_STEPS.OPTIONS);
            }, 1000);
        }, 300);
    };

    const getInputPlaceholder = () => {
        switch (currentStep) {
            case CHAT_STEPS.COLLECT_COMPANY: return "Company / Organization name...";
            case CHAT_STEPS.COLLECT_FIRST_NAME: return "Your first name...";
            case CHAT_STEPS.COLLECT_LAST_NAME: return "Your last name...";
            case CHAT_STEPS.COLLECT_EMAIL: return "your.email@example.com";
            case CHAT_STEPS.COLLECT_PHONE: return "+1 234 567 8900";
            case CHAT_STEPS.COLLECT_MESSAGE: return "Briefly describe your needs...";
            default: return "Type a message...";
        }
    };

    const getInputType = () => {
        switch (currentStep) {
            case CHAT_STEPS.COLLECT_EMAIL: return 'email';
            case CHAT_STEPS.COLLECT_PHONE: return 'tel';
            default: return 'text';
        }
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500 flex items-center justify-center shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-shadow"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring' }}
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-6 h-6 text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageCircle className="w-6 h-6 text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>

            {/* Pulse effect when closed */}
            {!isOpen && (
                <motion.div
                    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-amber-500 to-red-500"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: 'spring', damping: 25 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] h-[520px] max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-amber-500 to-red-500 px-5 py-4 flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="text-white font-medium">ZS Assistant</div>
                                    <div className="text-white/70 text-xs flex items-center gap-1">
                                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                        Online
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto bg-zinc-900 p-4 space-y-4">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[85%] ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user'
                                            ? 'bg-gradient-to-br from-amber-500 to-red-500'
                                            : 'bg-zinc-700'
                                            }`}>
                                            {msg.type === 'user' ? (
                                                <User className="w-4 h-4 text-white" />
                                            ) : (
                                                <Bot className="w-4 h-4 text-white" />
                                            )}
                                        </div>
                                        <div className={`px-4 py-2.5 rounded-2xl ${msg.type === 'user'
                                            ? 'bg-gradient-to-r from-amber-500 to-red-500 text-white rounded-br-md'
                                            : 'bg-zinc-800 text-white/90 rounded-bl-md'
                                            }`}>
                                            <p className="text-sm leading-relaxed">{msg.text}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md">
                                        <div className="flex gap-1">
                                            {[0, 1, 2].map((i) => (
                                                <motion.div
                                                    key={i}
                                                    className="w-2 h-2 bg-white/50 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input Area */}
                        <div className="bg-zinc-900 border-t border-white/10 p-4 flex-shrink-0">
                            {/* Options */}
                            {currentStep === CHAT_STEPS.OPTIONS && (
                                <div className="flex flex-wrap gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleOptionClick('hiring')}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/30 rounded-full text-sm text-white/90 hover:border-amber-500/60 transition-colors"
                                    >
                                        <Briefcase className="w-4 h-4" />
                                        Looking to Hire
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleOptionClick('project')}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/20 to-red-500/20 border border-amber-500/30 rounded-full text-sm text-white/90 hover:border-amber-500/60 transition-colors"
                                    >
                                        <Code className="w-4 h-4" />
                                        Have a Project
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => handleOptionClick('general')}
                                        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 border border-white/10 rounded-full text-sm text-white/70 hover:border-white/30 transition-colors"
                                    >
                                        <HelpCircle className="w-4 h-4" />
                                        Just Browsing
                                    </motion.button>
                                </div>
                            )}

                            {/* Text Input for collecting info */}
                            {(currentStep === CHAT_STEPS.COLLECT_COMPANY ||
                                currentStep === CHAT_STEPS.COLLECT_FIRST_NAME ||
                                currentStep === CHAT_STEPS.COLLECT_LAST_NAME ||
                                currentStep === CHAT_STEPS.COLLECT_EMAIL ||
                                currentStep === CHAT_STEPS.COLLECT_PHONE ||
                                currentStep === CHAT_STEPS.COLLECT_MESSAGE) && (
                                    <form onSubmit={handleInputSubmit} className="flex gap-2">
                                        <input
                                            type={getInputType()}
                                            value={inputValue}
                                            onChange={(e) => setInputValue(e.target.value)}
                                            placeholder={getInputPlaceholder()}
                                            className="flex-1 bg-zinc-800 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-amber-500/50"
                                            autoFocus
                                        />
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-red-500 flex items-center justify-center"
                                        >
                                            <Send className="w-4 h-4 text-white" />
                                        </motion.button>
                                    </form>
                                )}

                            {/* Connect to WhatsApp */}
                            {currentStep === CHAT_STEPS.CONNECTING && (
                                <div className="space-y-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={openWhatsApp}
                                        className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl text-white text-sm font-medium flex items-center justify-center gap-2"
                                    >
                                        <Phone className="w-4 h-4" />
                                        Chat on WhatsApp
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                    <button
                                        onClick={resetChat}
                                        className="w-full py-2 text-white/50 text-xs hover:text-white/80 transition-colors"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            )}

                            {/* General browsing */}
                            {currentStep === CHAT_STEPS.GENERAL && (
                                <div className="flex gap-2">
                                    <button
                                        onClick={resetChat}
                                        className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-red-500 rounded-xl text-white text-sm font-medium hover:opacity-90 transition-opacity"
                                    >
                                        Start Over
                                    </button>
                                    <button
                                        onClick={() => {
                                            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                            setIsOpen(false);
                                        }}
                                        className="flex-1 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white/80 text-sm hover:bg-zinc-700 transition-colors"
                                    >
                                        Contact Form
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
