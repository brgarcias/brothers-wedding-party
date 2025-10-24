"use client";

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <div className="font-serif text-4xl text-primary mb-2">L & D</div>
        <p className="text-sm text-muted-foreground mb-4">10 / Março / 2026</p>
        <p className="text-xs text-muted-foreground">
          Feito com amor para o nosso dia especial
        </p>
      </div>
    </footer>
  );
};

export default Footer;
