import { useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import 'bootstrap-icons/font/bootstrap-icons.css';
import { keyword } from '../data/keyWord';

export default function Chatbot() {
    const [inputUser, setInputUser] = useState('');
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const apiKey = 'AIzaSyCbCzeXSnEJRxx2d-sqVq-RHzGh_lQGwCM';

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    const generationConfig = {
        maxOutputTokens: 100,
        temperature: 1,
    };

    // Fungsi untuk menangani input pengguna dan memberikan respons
    async function handlePromptSubmit() {
        setLoading(true);
        setResponse('');
        try {
            let customResponse = '';

            const productMatch = keyword.find(p =>
                new RegExp(p.name, 'i').test(inputUser)
            );

            if (productMatch) {
                // Jika ditemukan produk yang cocok, beri informasi tentang produk tersebut
                customResponse = `Aku merekomendasikan kamu ${productMatch.description}. Yang memiliki manfaat ${productMatch.benefits}. Dengan harga Rp ${productMatch.price},-.`;
            } else if (/rekomendasi/i.test(inputUser)) {
                // Jika pengguna meminta rekomendasi produk
                const product = keyword[0];
                customResponse = `Rekomendasi produk: ${product.name}. Deskripsi: ${product.description}. Manfaat: ${product.benefits}. Harga: ${product.price}.`;
            } else if (/manfaat/i.test(inputUser)) {
                // Jika pengguna menanyakan manfaat produk
                const productBenefits = keyword.map(p => `${p.name}: ${p.benefits}`).join("\n");
                customResponse = `Manfaat produk kami:\n${productBenefits}`;
            } else {
                // Gunakan API AI jika input tidak cocok dengan respons yang disiapkan
                const chatSession = model.startChat({
                    generationConfig,
                    history: [],
                });
                const result = await chatSession.sendMessage(inputUser);
                customResponse = result.response.text;
            }

            setResponse(customResponse);
        } catch (error) {
            console.error(error);
            setResponse('Terjadi kesalahan. Silakan coba lagi.');
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setInputUser('');
        setResponse('');
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
                        <h5 className="mb-4">Tanya EcoBot</h5>
                        <div className="form-group mb-4">
                            <label htmlFor="userInput" className="form-label">Kamu mau beli apa hari ini?
                            </label>
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
                                disabled={loading || !inputUser.trim()}
                            >
                                {loading ? 'Memproses...' : 'Tanya'}
                            </button>
                            <button
                                onClick={handleReset}
                                type="button"
                                className="btn btn-secondary w-100 reset-button"
                                disabled={!inputUser && !response}
                            >
                                Reset
                            </button>
                        </div>
                        {loading && (
                            <div className="loading-spinner mt-4 text-center">
                                <div className="custom-spinner" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                        {response && (
                            <div className="mt-5">
                                <h5 className="response-title">Respons dari EcoBot:</h5>
                                <div className="response-text">{response}</div>
                            </div>
                        )}
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
