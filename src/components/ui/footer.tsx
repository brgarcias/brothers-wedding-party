"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/40 py-10">
      <div className="max-w-3xl mx-auto text-center space-y-4">
        {/* Monograma */}
        <div className="flex items-center justify-center gap-2">
          <span className="font-serif text-5xl md:text-6xl text-primary">
            L
          </span>
          <span className="font-serif text-5xl md:text-6xl text-muted-foreground">
            &
          </span>
          <span className="font-serif text-5xl md:text-6xl text-primary">
            D
          </span>
        </div>

        {/* Data */}
        <p className="text-sm md:text-base tracking-widest uppercase text-muted-foreground">
          10 / Março / 2026
        </p>

        {/* Mensagem */}
        <p className="text-xs md:text-sm text-muted-foreground">
          Com amor, Leonardo e Débora
        </p>

        {/* Créditos opcionais */}
        <p className="text-[10px] md:text-xs text-muted-foreground mt-2">
          © {new Date().getFullYear()} Leonardo & Débora
        </p>
      </div>
    </footer>
  );
};

export default Footer;
