import { useState, useEffect } from 'react';

interface TitleRotatorProps {
  titles: string[];
}

export default function TitleRotator({ titles }: TitleRotatorProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = titles[currentIndex];

    if (isDeleting) {
      // Deleting speed
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
        setTypingSpeed(40);
      }, typingSpeed);
    } else {
      // Typing speed
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
        setTypingSpeed(100);
      }, typingSpeed);
    }

    // Switch states
    if (!isDeleting && currentText === fullText) {
      // Pause before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 1800);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentIndex((prev) => (prev + 1) % titles.length);
      setTypingSpeed(150);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentIndex, titles, typingSpeed]);

  return (
    <div className="flex items-center min-h-[40px] font-mono text-electric font-semibold text-lg md:text-2xl tracking-wide gap-1.5" id="title-rotator-container">
      <span className="text-gray-400 select-none">&gt;</span>
      <span>{currentText}</span>
      <span className="w-2.5 h-6 bg-electric inline-block cursor-blink border-r-2 border-electric" id="terminal-cursor"></span>
    </div>
  );
}
