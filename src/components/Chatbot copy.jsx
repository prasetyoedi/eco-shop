import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { keyword } from '../data/keyWord';

export default function Chatbot() {
    const [inputUser, setInputUser] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const apiKey = import.meta.env.VITE_API_KEY;

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const generationConfig = {
        maxOutputTokens: 100,
        temperature: 1,
    };

    async function handlePromptSubmit() {
        if (!inputUser.trim()) return;
        setLoading(true);
    
        // Tambahkan pesan pengguna ke riwayat
        setChatHistory((prev) => [...prev, { sender: 'user', message: inputUser }]);
        setInputUser('');
        try {
            let customResponse = '';
    
            if (/apa itu ecoshop/i.test(inputUser)) {
                // Jika pengguna menanyakan tentang Ecoshop
                customResponse = 'EcoShop adalah platform e-commerce yang menjual produk-produk ramah lingkungan. Produk yang dijual terbuat dari bahan-bahan berkelanjutan, dapat didaur ulang, atau dirancang untuk mengurangi dampak negatif terhadap lingkungan.';
            } else {
                const productMatch = keyword.find(p =>
                    new RegExp(p.name, 'i').test(inputUser)
                );
    
                if (productMatch) {
                    customResponse = `Aku merekomendasikan kamu ${productMatch.description}. Yang memiliki manfaat ${productMatch.benefits}. Dengan harga Rp ${productMatch.price},-.`;
                } else if (/rekomendasi/i.test(inputUser)) {
                    const product = keyword[0];
                    customResponse = `Rekomendasi produk: ${product.name}. Deskripsi: ${product.description}. Manfaat: ${product.benefits}. Harga: ${product.price}.`;
                } else if (/manfaat/i.test(inputUser)) {
                    const productBenefits = keyword.map(p => `${p.name}: ${p.benefits}`).join("\n");
                    customResponse = `Manfaat produk kami:\n${productBenefits}`;
                } else {
                    const chatSession = model.startChat({
                        generationConfig,
                        history: chatHistory.map(({ sender, message }) => ({
                            role: sender === 'user' ? 'user' : 'assistant',
                            content: message,
                        })),
                    });
                    const result = await chatSession.sendMessage(inputUser);
                    customResponse = result.response.text;
                }
            }
    
            // Tambahkan respons bot ke riwayat
            setChatHistory((prev) => [...prev, { sender: 'bot', message: customResponse }]);
        } catch (error) {
            console.error(error);
            setChatHistory((prev) => [...prev, { sender: 'bot', message: 'Terjadi kesalahan. Silakan coba lagi.' }]);
        } finally {
            setLoading(false);
        }
    }
    

    function handleReset() {
        setChatHistory([]);
        setInputUser('');
    }

    function toggleChat() {
        setIsChatOpen(!isChatOpen);
    }

    return (
        <>
            {!isChatOpen && (
                <button
                    onClick={toggleChat}
                    className="btn btn-primary floating-icon"
                    aria-label="Open Chatbot"
                >
                    <i className="bi bi-chat"></i>
                </button>
            )}

            {isChatOpen && (
                <div className="p-3 container-bot">
                    <div className="card shadow-lg p-4 floating-bot">
                        <h5 className="mb-2">Tanya EcoBot</h5>
                        <div className="chat-history mb-4">
                            {chatHistory.map((chat, index) => (
                                <div key={index} className={`chat-bubble ${chat.sender}`}>
                                    <strong>{chat.sender === 'user' ? 'Kamu' : 'EcoBot'}:</strong> {chat.message}
                                </div>
                            ))}
                        </div>
                        <div className="form-group mb-4">
                            {/* <label htmlFor="userInput" className="form-label">Kamu mau beli apa hari ini?</label> */}
                            <input
                                type="text"
                                id="userInput"
                                className="form-control custom-input"
                                placeholder="Ketik disini"
                                value={inputUser}
                                onChange={(e) => setInputUser(e.target.value)}
                            />
                        </div>
                        <div className="d-flex justify-content-between">
                            <button
                                onClick={handlePromptSubmit}
                                type="button"
                                className="btn btn-primary w-100 me-2 submit-button"
                                disabled={loading}
                            >
                                {loading ? 'Memproses...' : 'Tanya'}
                            </button>
                            <button
                                onClick={handleReset}
                                type="button"
                                className="btn btn-secondary w-100 reset-button"
                            >
                                Reset
                            </button>
                        </div>
                        <button
                            onClick={toggleChat}
                            className="btn btn-danger close-chat-btn"
                            aria-label="Close Chatbot"
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
