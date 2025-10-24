"use client";

import React from "react";
import { Heart } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border/50 py-6 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        {/* Monograma */}
        <div className="flex items-center justify-center gap-2 animate-fadeIn">
          <span className="font-serif text-5xl md:text-6xl text-primary">
            L
          </span>
          <Heart className="w-6 h-6 md:w-8 md:h-8 text-pink-500 animate-pulse" />
          <span className="font-serif text-5xl md:text-6xl text-primary">
            D
          </span>
        </div>

        {/* Data do casamento */}
        <p className="text-sm md:text-base text-muted-foreground">
          10 / Março / 2026
        </p>

        {/* Mensagem final */}
        <p className="text-xs md:text-sm text-muted-foreground">
          Feito com amor para o nosso dia especial
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
