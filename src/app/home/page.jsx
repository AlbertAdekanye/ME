"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti";
import Image from "next/image";
import Guestbook from "../components/Guestbook";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const birthday = new Date("March 7, 2025 00:00:00").getTime();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeRemaining = birthday - now;

      if (timeRemaining <= 0) {
        setShowConfetti(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(timeRemaining / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeRemaining % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <p className="text-center text-white text-2xl">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-r from-pink-500 to-purple-600 p-6">
      {showConfetti && <Confetti />}

      <h1 className="text-5xl font-extrabold bg-black bg-opacity-50 p-4 rounded-lg animate-pulse">
        🎉 Welcome to My Birthday Party! 🎂
      </h1>

      <p className="mt-4 text-xl bg-white bg-opacity-20 p-2 rounded-md shadow-lg text-black">
        Let's celebrate together! 🎊
      </p>

      {showConfetti ? (
        <p className="mt-6 text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg animate-bounce">
          🎊 It's Party Time! 🎈🎁
        </p>
      ) : (
        <div className="flex space-x-6 mt-8 text-3xl font-bold bg-black bg-opacity-50 p-6 rounded-lg shadow-lg">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="p-4 border-4 border-white rounded-lg hover:scale-110 transition-transform">
              <p>{timeLeft[unit]}</p>
              <span className="text-sm">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            </div>
          ))}
        </div>
      )}

     <Image
        src="https://plus.unsplash.com/premium_photo-1670692695578-319f28b97ac1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y2FrZXxlbnwwfHwwfHx8MA%3D%3D"
        alt="Birthday Cake"
        width={300}
        height={300}
        className="mt-8 rounded-lg shadow-lg animate-bounce"
        unoptimized // Disable Next.js optimization for external images
      />

       <Guestbook />

    </main>
  );
}
