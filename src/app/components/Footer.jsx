'use client';
const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white text-center p-4 mt-10">
      <p>© {new Date().getFullYear()} Albert's Birthday Bash 🎉</p>
      <p>Made with ❤️ for my special day!</p>
      <div className="flex justify-center space-x-4 mt-2">
        <a href="https://x.com/adekanye_albert" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Twitter
        </a>
        <a href="https://github.com/AlbertAdekanye" target="_blank" rel="noopener noreferrer" className="hover:underline">
          GitHub
        </a>
        <a href="https://www.instagram.com/kanyecode/" target="_blank" rel="noopener noreferrer" className="hover:underline">
          Instagram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
