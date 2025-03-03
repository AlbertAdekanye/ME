'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

export default function BirthdayPage() {
  const [timeLeft, setTimeLeft] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const birthday = new Date("March 7, 2025 00:00:00").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const timeLeft = birthday - now;

      if (timeLeft <= 0) {
        setShowConfetti(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) {
    return <p className="text-center text-white">Loading...</p>;
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-r from-blue-500 to-purple-500 relative">
      <h1 className="text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg animate-pulse">
        🎉 My Birthday Countdown! 🎂
      </h1>

      {showConfetti ? (
        <p className="mt-6 text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg animate-bounce">
          🎊 It`s my birthday! Let`s celebrate! 🎈🥳
        </p>
      ) : (
        <div className="flex space-x-4 mt-6 text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
          {["days", "hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className="animate-bounce">
              <p>{timeLeft[unit]}</p>
              <span className="text-sm">{unit.charAt(0).toUpperCase() + unit.slice(1)}</span>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}


