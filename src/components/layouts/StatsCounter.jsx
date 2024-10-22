import { useThemeContext } from '@/contexts/ThemeProvider';
import React, { useState, useEffect, useRef } from 'react';

const StatsCounter = () => {
    const images = [
        "/imgs/counter-1.png",
        "/imgs/counter-2.png",
        "/imgs/counter-3.png",
        "/imgs/counter-4.png",
    ];

    const [dishes, setDishes] = useState(80);
    const [customers, setCustomers] = useState(2370);
    const [awards, setAwards] = useState(0);
    const [workingHours, setWorkingHours] = useState(2570);
    const { colorCode } = useThemeContext();
    const [isVisible, setIsVisible] = useState(false);
    const statsRef = useRef(null);

    const incrementCounters = () => {
        if (dishes < 103) setDishes((prev) => prev + 1);
        if (customers < 2398) setCustomers((prev) => prev + 1);
        if (awards < 20) setAwards((prev) => prev + 1);
        if (workingHours < 2589) setWorkingHours((prev) => prev + 1);
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 } // Chỉ khi 10% của component được nhìn thấy
        );

        if (statsRef.current) {
            observer.observe(statsRef.current);
        }

        return () => {
            if (statsRef.current) {
                observer.unobserve(statsRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const interval = setInterval(incrementCounters, 50); // Tăng mỗi 50ms
            return () => clearInterval(interval);
        }
    }, [isVisible, dishes, customers, awards, workingHours]);

    const stats = [
        { value: dishes, label: '/Món ăn' },
        { value: customers, label: '/Khách hàng' },
        { value: awards, label: '/Giải thưởng' },
        { value: workingHours, label: '/Giờ làm việc' },
    ];

    return (
        <div
            ref={statsRef}
            className="flex flex-col sm:flex-row justify-around p-20 bg-zinc-100 relative"
        >
            <img
                src="imgs/vegetable_01.png"
                alt="Vegetable 1"
                className="absolute left-0 transform translate-x-[-30%] w-40 h-40 sm:w-auto sm:h-auto"
            />
            <img
                src="imgs/vegetable_02.png"
                alt="Vegetable 2"
                className="absolute right-0 transform translate-x-[50%] -translate-y-[60%] w-40 h-40 sm:w-auto sm:h-auto"
            />
            {stats.map((stat, index) => (
                <div key={index} className="text-center flex flex-col items-center mb-6 sm:mb-0">
                    <div className="flex items-baseline">
                        <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: colorCode }}>
                            {stat.value}
                        </h2>
                        <span className='text-base sm:text-[20px] ml-1'>{stat.label}</span>
                    </div>
                    <img src={images[index]} alt={stat.label} className="mt-2 w-20 h-20 sm:w-auto sm:h-auto" />
                </div>
            ))}
        </div>
    );
};

export default StatsCounter;
