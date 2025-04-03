import { Button } from '@/components/ui/button';
import axios from 'axios';
import { gsap } from 'gsap';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Chat component for the interactive demo
const ChatDemo = () => {
    const [messages, setMessages] = useState([{ id: 1, text: 'Tagalugin mo eenglishin ko!', sender: 'bot' }]);
    const [inputValue, setInputValue] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translationCount, setTranslationCount] = useState(0);
    const [isExceedingLimit, setIsExceedingLimit] = useState(false);

    // New state for tracking if user needs to register
    const [shouldShowRegistration, setShouldShowRegistration] = useState(false);

    const messagesEndRef = useRef(null);
    const chatContainerRef = useRef(null);
    const shouldScrollRef = useRef(false); // Control whether to scroll or not

    // Function to check if input exceeds character limit
    const checkCharacterLimit = (text) => {
        return text.length <= 100;
    };

    // Check character limit whenever input changes
    useEffect(() => {
        if (inputValue.length > 100) {
            setIsExceedingLimit(true);

            // Only add warning message if it doesn't exist already
            const hasWarningMessage = messages.some((msg) => msg.sender === 'bot' && msg.text.includes('Input cannot exceed 100 characters'));

            if (!hasWarningMessage) {
                setMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now(),
                        text: 'Input cannot exceed 100 characters to prevent token abuse.',
                        sender: 'bot',
                    },
                ]);
                shouldScrollRef.current = true;
            }
        } else {
            setIsExceedingLimit(false);
        }
    }, [inputValue]);

    // Modified scroll effect that only scrolls when we explicitly want it to
    useEffect(() => {
        if (messagesEndRef.current && shouldScrollRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            shouldScrollRef.current = false; // Reset after scrolling
        }
    }, [messages]);

    useEffect(() => {
        if (chatContainerRef.current) {
            gsap.from(chatContainerRef.current, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                delay: 0.3,
                ease: 'power3.out',
            });
        }
    }, []);

    // When shouldShowRegistration changes, emit event to parent component
    useEffect(() => {
        if (shouldShowRegistration) {
            // Create and dispatch a custom event that Welcome.tsx will listen for
            const event = new CustomEvent('showRegistration');
            window.dispatchEvent(event);
        }
    }, [shouldShowRegistration]);

    const handleMicClick = () => {
        // Placeholder for mic functionality
        console.log('Mic button clicked');
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        // Only update the input value if we're not exceeding the limit
        // or if the new value is shorter (allowing users to delete text)
        if (checkCharacterLimit(newValue) || newValue.length < inputValue.length) {
            setInputValue(newValue);
        }
    };

    const handleSubmit = async (e) => {
        // Completely prevent any default behaviors
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        if (!inputValue.trim() || isExceedingLimit) return;

        // Add user message
        const userMessage = { id: Date.now(), text: inputValue, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsTranslating(true);
        shouldScrollRef.current = true;

        try {
            // Make API request to the backend translation endpoint
            const response = await axios.post('/translate', { text: inputValue });

            // Add the translation response to messages
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: response.data.translation || 'Error: Could not get translation',
                    sender: 'bot',
                },
            ]);
            shouldScrollRef.current = true;

            // Increment translation count
            setTranslationCount((prev) => prev + 1);

            // If this is the second translation, signal parent to show registration
            if (translationCount === 1) {
                setTimeout(() => {
                    setShouldShowRegistration(true);

                    // Also add a message about registration
                    setMessages((prev) => [
                        ...prev,
                        {
                            id: Date.now() + 2,
                            text: "You've reached the limit of free translations. Please sign in with Google to continue using our service!",
                            sender: 'bot',
                        },
                    ]);
                    shouldScrollRef.current = true;
                }, 1000);
            }
        } catch (error) {
            console.error('Translation error:', error);

            // Add error message
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    text: 'Magsign in ka na dahil wala ka free trial!',
                    sender: 'bot',
                },
            ]);
            shouldScrollRef.current = true;

            // Dispatch an event to notify the error occurred
            const errorEvent = new CustomEvent('translationError');
            window.dispatchEvent(errorEvent);
        } finally {
            setIsTranslating(false);
        }
    };

    return (
        <div className="relative z-10">
            <div ref={chatContainerRef} className="relative z-10 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl">
                <div className="bg-blue-600 p-4 text-white">
                    <h3 className="font-bold">Try mo yung free trial hindi ka magsisisi!</h3>
                </div>

                <div className="h-64 overflow-y-auto bg-gray-50 p-4">
                    {messages.map((message) => (
                        <div key={message.id} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div
                                className={`inline-block max-w-[80%] rounded-lg p-3 ${
                                    message.sender === 'user'
                                        ? 'rounded-br-none bg-blue-600 text-white'
                                        : 'rounded-bl-none border border-gray-200 bg-white text-gray-800 shadow-sm'
                                }`}
                            >
                                {message.text}
                            </div>
                        </div>
                    ))}
                    {isTranslating && (
                        <div className="mb-4 text-left">
                            <div className="inline-block rounded-lg rounded-bl-none border border-gray-200 bg-white p-3 shadow-sm">
                                <div className="flex space-x-2">
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                                    <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Changed from form to div to prevent any form submission behavior */}
                <div className="flex border-t border-gray-200 p-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type in Filipino (try 'Kumusta' or 'Salamat')"
                        disabled={shouldShowRegistration}
                        className={`flex-1 rounded-l-md border px-3 py-2 focus:outline-none ${
                            isExceedingLimit ? 'border-red-500 bg-red-100 text-white' : 'border-gray-300 focus:ring-2 focus:ring-blue-500'
                        }`}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                if (inputValue.trim() && !isTranslating && !shouldShowRegistration && !isExceedingLimit) {
                                    handleSubmit(e);
                                }
                            }
                        }}
                    />

                    <Button
                        type="button"
                        onClick={handleSubmit}
                        className="rounded-l-none"
                        disabled={!inputValue.trim() || isTranslating || shouldShowRegistration || isExceedingLimit}
                    >
                        <Send className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ChatDemo;
