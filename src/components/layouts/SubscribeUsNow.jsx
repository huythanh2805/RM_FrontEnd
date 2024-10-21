import { useThemeContext } from '@/contexts/ThemeProvider';
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const SubscribeUsNow = () => {
    const [email, setEmail] = useState('');
    const { colorCode } = useThemeContext();

    const handleSubscribe = () => {
        console.log("Subscribed with email:", email);
        setEmail('');
    };

    return (
        <div className="flex items-center justify-center p-10 pt-[100px] rounded-lg shadow-md relative">
            <img
                src="imgs/bg5.png"
                alt="Background"
                className="absolute w-[280px] ml-[500px] object-cover"
            />
            <div className="flex flex-col items-center justify-center z-10">
                <h2 className="text-2xl font-bold mb-2 text-center">Đăng Ký Với Chúng Tôi Ngay</h2>
                <span className="mb-4 text-gray-700">Nhận thêm tin tức và món ăn ngon mỗi ngày từ chúng tôi</span>
                <div className="flex items-center border rounded-md overflow-hidden">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="p-2 flex-1 border-none focus:outline-none"
                        required
                    /> |
                    <button
                        onClick={handleSubscribe}
                        className="flex items-center justify-center text-white p-2 transition-colors duration-300"
                    >
                        <FaPaperPlane style={{color: colorCode}}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SubscribeUsNow;
