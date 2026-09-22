import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollBottom = window.scrollY + window.innerHeight;
      setVisible(window.scrollY > 0 && scrollBottom >= document.documentElement.scrollHeight - 160);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink-600 text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-ink-700 focus-visible:outline-offset-4"
      aria-label="Scroll back to top"
      title="Back to top"
    >
      <ArrowUp size={19} strokeWidth={2} />
    </button>
  );
}