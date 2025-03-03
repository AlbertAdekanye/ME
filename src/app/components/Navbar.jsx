'use client';
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            March7Magic ✨
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-gray-200">Home</Link>
            <Link href="/feed" className="hover:text-gray-200">Feed</Link>
            <Link href="/profile" className="hover:text-gray-200">Profile</Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none text-xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 p-4">
          <Link href="/" className="block py-2">Home</Link>
          <Link href="/feed" className="block py-2">Feed</Link>
          <Link href="/profile" className="block py-2">Profile</Link>
        </div>
      )}
    </nav>
  );
}
