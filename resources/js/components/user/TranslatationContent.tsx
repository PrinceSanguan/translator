import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import axios from 'axios';
import { Clock, Copy, Loader2, MessageSquare, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

// Translation interface
interface Translation {
    id: number;
    input: string;
    output: string;
    timestamp: Date;
}

// Maximum character limit for input
const MAX_CHARS = 100;

const TranslationContent = () => {
    const [inputText, setInputText] = useState('');
    const [isTranslating, setIsTranslating] = useState(false);
    const [translations, setTranslations] = useState<Translation[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [remainingTranslations, setRemainingTranslations] = useState(3);
    const [cooldownTime, setCooldownTime] = useState(0);
    const translationBoxRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (cooldownTime > 0) {
            interval = setInterval(() => {
                setCooldownTime((prevTime) => {
                    if (prevTime <= 1) {
                        setRemainingTranslations(3);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [cooldownTime]);

    // Handle input change with character limit
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        // Limit text to MAX_CHARS characters
        if (text.length <= MAX_CHARS) {
            setInputText(text);
        } else {
            setInputText(text.slice(0, MAX_CHARS));
            // Notify user they've hit the limit
            toast.info('Character limit reached', {
                description: `Maximum of ${MAX_CHARS} characters allowed`,
                duration: 2000,
            });
        }
    };

    // Handle paste event to enforce character limit
    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const remainingChars = MAX_CHARS - inputText.length;

        if (pastedText.length + inputText.length <= MAX_CHARS) {
            // Can paste the full text
            setInputText((prev) => prev + pastedText);
        } else {
            // Only paste what fits within the limit
            const truncatedPaste = pastedText.slice(0, remainingChars);
            setInputText((prev) => prev + truncatedPaste);

            toast.info('Character limit reached', {
                description: `Text truncated to fit ${MAX_CHARS} character limit`,
                duration: 2000,
            });
        }
    };

    const handleTranslate = async () => {
        if (!inputText.trim() || isTranslating) return;

        if (remainingTranslations <= 0) {
            setErrorMessage('Rate limit reached. Please wait before making more translations.');
            return;
        }

        setIsTranslating(true);
        setErrorMessage(null);

        try {
            const response = await axios.post('/user/translate', { text: inputText.trim() });

            if (response.data && response.data.translation) {
                // Add new translation to the list
                const newTranslation = {
                    id: Date.now(),
                    input: inputText.trim(),
                    output: response.data.translation,
                    timestamp: new Date(),
                };

                setTranslations((prev) => [newTranslation, ...prev.slice(0, 9)]);
                setInputText('');

                // Update remaining translations from API response
                if (response.data.remaining !== undefined) {
                    setRemainingTranslations(response.data.remaining);
                    if (response.data.remaining <= 0) {
                        setCooldownTime(60); // 60 second cooldown
                    }
                }

                // Scroll to the new translation
                if (translationBoxRef.current) {
                    translationBoxRef.current.scrollTop = 0;
                }
            }
        } catch (error: any) {
            console.error('Translation error:', error);

            // Handle rate limit error specifically
            if (error.response && error.response.status === 429) {
                setErrorMessage(error.response.data.message || 'Rate limit exceeded. Please wait before making more translations.');
                // Set cooldown timer from API response if available
                if (error.response.data.cooldown) {
                    setCooldownTime(error.response.data.cooldown);
                }
            } else {
                setErrorMessage('An error occurred during translation. Please try again.');
            }
        } finally {
            setIsTranslating(false);
        }
    };

    // Format time for countdown
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' + secs : secs}`;
    };

    // Copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text).then(
            () => {
                toast.success('Copied!', {
                    description: 'Text copied to clipboard',
                    duration: 2000,
                });
            },
            () => {
                toast.error('Failed to copy', {
                    description: 'Could not copy text to clipboard',
                    duration: 2000,
                });
            },
        );
    };

    return (
        <div className="w-full px-4 py-6 md:px-6 md:py-8">
            {/* Page title with proper spacing on mobile */}
            <div className="mt-8 mb-6 md:mt-0">
                <h1 className="mb-2 bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
                    Translation Dashboard
                </h1>
                <p className="text-slate-600">Convert Tagalog text to English in seconds</p>
            </div>

            <div className="mx-auto w-full max-w-4xl">
                {/* Translator Section */}
                <Card className="w-full shadow-md">
                    <CardHeader className="border-b bg-slate-50/80 p-4">
                        <CardTitle className="flex items-center text-lg">
                            <MessageSquare className="mr-2 h-5 w-5 flex-shrink-0 text-cyan-600" />
                            <span className="truncate">Tagalog to English Translator</span>
                        </CardTitle>
                        <CardDescription>
                            {cooldownTime > 0 ? (
                                <div className="flex items-center text-amber-600">
                                    <Clock className="mr-2 h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">Cooldown: {formatTime(cooldownTime)}</span>
                                </div>
                            ) : (
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm text-slate-500">{remainingTranslations} translations remaining</span>
                                    <Badge variant="outline" className="border-cyan-200 text-xs font-normal whitespace-nowrap text-cyan-600">
                                        3/minute limit
                                    </Badge>
                                </div>
                            )}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4">
                        {errorMessage && (
                            <Alert variant="destructive" className="py-2 text-sm">
                                <AlertDescription>{errorMessage}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <div className="relative">
                                <Textarea
                                    placeholder="Type your Tagalog text here (e.g., 'Kumusta ka?')"
                                    className="min-h-24 w-full pr-16 focus-visible:ring-cyan-500"
                                    value={inputText}
                                    onChange={handleInputChange}
                                    onPaste={handlePaste}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                                        if (e.key === 'Enter' && !e.shiftKey && inputText.trim()) {
                                            e.preventDefault();
                                            handleTranslate();
                                        }
                                    }}
                                    disabled={isTranslating || cooldownTime > 0}
                                    maxLength={MAX_CHARS}
                                />
                                <div className="absolute right-2 bottom-2 text-xs text-slate-500">
                                    {inputText.length}/{MAX_CHARS}
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    onClick={handleTranslate}
                                    disabled={!inputText.trim() || isTranslating || cooldownTime > 0}
                                    className="bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-600 hover:to-indigo-700"
                                >
                                    {isTranslating ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Translating...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" /> Translate
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>

                        <div className="mt-6">
                            <h3 className="mb-2 font-medium text-slate-700">Translation History</h3>
                            <div
                                ref={translationBoxRef}
                                className="max-h-96 divide-y divide-slate-100 overflow-y-auto rounded-md border border-slate-200 bg-white"
                            >
                                {translations.length === 0 ? (
                                    <div className="p-6 text-center text-sm text-slate-500 italic">Your translations will appear here</div>
                                ) : (
                                    translations.map((translation) => (
                                        <div key={translation.id} className="p-4 hover:bg-slate-50">
                                            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                                <Badge variant="outline" className="border-indigo-200 text-xs font-normal text-indigo-600">
                                                    Filipino
                                                </Badge>
                                                <span className="text-xs text-slate-400">{translation.timestamp.toLocaleTimeString()}</span>
                                            </div>
                                            <div className="group relative mb-4 break-words">
                                                <p className="mb-1 pr-8 text-sm">{translation.input}</p>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="absolute top-0 right-0 h-7 w-7 opacity-50 transition-opacity group-hover:opacity-100 md:opacity-0"
                                                    onClick={() => copyToClipboard(translation.input)}
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Badge variant="outline" className="border-cyan-200 text-xs font-normal text-cyan-600">
                                                    English
                                                </Badge>
                                            </div>
                                            <div className="group relative mt-2 break-words">
                                                <p className="pr-8 text-sm font-medium text-slate-700">{translation.output}</p>
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="absolute top-0 right-0 h-7 w-7 opacity-50 transition-opacity group-hover:opacity-100 md:opacity-0"
                                                    onClick={() => copyToClipboard(translation.output)}
                                                >
                                                    <Copy className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default TranslationContent;
