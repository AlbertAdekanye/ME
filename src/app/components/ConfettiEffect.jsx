"use client";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

export default function ConfettiEffect() {
  const [isConfettiActive, setIsConfettiActive] = useState(false);

  useEffect(() => {
    // Activate confetti for 5 seconds when countdown reaches zero
    setIsConfettiActive(true);
    const timer = setTimeout(() => setIsConfettiActive(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return isConfettiActive ? <Confetti numberOfPieces={300} recycle={false} /> : null;
}
