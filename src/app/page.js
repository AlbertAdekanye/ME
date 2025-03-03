'use client';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState, useEffect } from "react";

export default function BirthdayPage() {
  const birthday = new Date("March 7, 2025 00:00:00").getTime(); // Set your birthday

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const timeLeft = birthday - now;

    if (timeLeft <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
      hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center text-white bg-gradient-to-r from-purple-500 to-pink-500">
      <h1 className="text-4xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
        🎉 My Birthday Countdown! 🎂
      </h1>

      {timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 ? (
        <p className="mt-6 text-2xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
          🎊 Its my birthday! Let`s celebrate! 🎈🥳
        </p>
      ) : (
        <div className="flex space-x-4 mt-6 text-3xl font-bold bg-black bg-opacity-50 p-4 rounded-lg">
          <div>
            <>{timeLeft.days}</>
            <span className="text-sm">Days</span>
          </div>
          <div>
            <>{timeLeft.hours}</>
            <span className="text-sm">Hours</span>
          </div>
          <div>
            <>{timeLeft.minutes}</>
            <span className="text-sm">Minutes</span>
          </div>
          <div>
            <>{timeLeft.seconds}</>
            <span className="text-sm">Seconds</span>
          </div>
        </div>
      )}
    </main>
  );
}

