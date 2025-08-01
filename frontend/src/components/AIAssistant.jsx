import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postAiQuery, addUserMessage } from '../features/ai/aiSlice';
import { BrainCircuit, Send, Lightbulb, AlertTriangle } from 'lucide-react';

const AIAssistant = () => {
    const dispatch = useDispatch();
    const { conversation, status } = useSelector((state) => state.ai);
    const [input, setInput] = useState('');
    const chatAreaRef = useRef(null);

    useEffect(() => {
        if (chatAreaRef.current) chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }, [conversation]);

    const handleSend = (queryText) => {
        if (!queryText || queryText.trim() === '') return;
        dispatch(addUserMessage(queryText));
        dispatch(postAiQuery({ query: queryText }));
        setInput('');
    };

    const renderBubble = (msg, index) => {
        if (msg.sender === 'user') {
            return <div key={index} className="ml-auto w-fit max-w-[90%] rounded-md bg-indigo-100 px-3 py-2 text-slate-800 text-sm">{msg.text}</div>;
        }
        
        const isInsight = msg.type === 'insight';
        const isAlert = msg.type === 'alert';

        if (isInsight || isAlert) {
             return (
                <div key={index} className={`rounded-lg p-3 ${isAlert ? 'bg-amber-50 border border-amber-200' : 'bg-indigo-50 border border-indigo-200'}`}>
                    <h4 className={`flex items-center text-sm font-semibold mb-1 ${isAlert ? 'text-amber-700' : 'text-indigo-700'}`}>
                        {isInsight && <Lightbulb className="w-4 h-4 mr-2" />}
                        {isAlert && <AlertTriangle className="w-4 h-4 mr-2" />}
                        {msg.title}
                    </h4>
                    <p className="text-xs text-slate-600">{msg.text}</p>
                </div>
            );
        }

        return <div key={index} className="whitespace-pre-wrap rounded-md bg-slate-100 p-3 text-slate-700 text-sm">{msg.text}</div>;
    };

    return (
        <aside className="flex h-full w-[24rem] shrink-0 flex-col border-l border-slate-200 bg-white">
            <div className="flex items-center bg-indigo-600 p-4 text-white">
                <BrainCircuit className="mr-2 h-5 w-5" />
                <h3 className="font-semibold text-base">AI Assistant</h3>
            </div>
            
            {/* --- NEW PROMPTS ADDED HERE --- */}
            <div className="border-b border-slate-200 p-2 text-xs">
                <p className="font-semibold mb-1">Try these prompts:</p>
                <div className="flex flex-wrap gap-1">
                    <button onClick={() => handleSend("Identify trends")} className="suggestion-chip">Identify Trends</button>
                    <button onClick={() => handleSend("Show all planned events")} className="suggestion-chip">Filter by 'Planned'</button>
                    <button onClick={() => handleSend("Summarize Audit ID 1")} className="suggestion-chip">Summarize Audit ID 1</button>
                    <button onClick={() => handleSend("Who is on the team for audit 1?")} className="suggestion-chip">List Personnel for ID 1</button>
                    <button onClick={() => handleSend("Draft kickoff email for audit 1")} className="suggestion-chip">Draft Kick-off for ID 1</button>
                </div>
            </div>
            
            <div ref={chatAreaRef} className="flex-grow space-y-2 overflow-y-auto p-4">
                {conversation.map(renderBubble)}
                {status === 'loading' && <div className="rounded-md bg-slate-100 p-3 text-slate-700">Thinking...</div>}
            </div>
            
            <div className="border-t border-slate-200 p-4 bg-slate-50">
                <div className="relative">
                    <input
                        type="text" value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend(input)}
                        placeholder="Ask AI to list audit..."
                        className="w-full rounded-md border border-slate-300 py-2 pl-3 pr-10 text-sm shadow-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button onClick={() => handleSend(input)} title="Send" className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 hover:text-indigo-800">
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AIAssistant;