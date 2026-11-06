"use client";

import { useEffect, useState } from "react";
import { TLink } from "./PageTransition";

export default function ChatButton() {
  // Sur mobile, le bouton laisse la place aux scènes quand on descend (voir globals.css).
  const [away, setAway] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 8) return;
      setAway(y > last && y > 200);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <TLink href="/demo/messagerie" className={`chatfab ${away ? "chatfab--away" : ""}`} aria-label="Ouvrir la messagerie">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path
          d="M4 5.5h16v11H10l-4.5 3.5v-3.5H4z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      </svg>
      <span className="chatfab__label">Messagerie</span>
    </TLink>
  );
}
