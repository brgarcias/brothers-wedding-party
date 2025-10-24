"use client";

import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <Button
            variant="ghost"
            size="icon"
            className="p-2 hover:bg-primary/10 transition-colors"
            data-testid="button-home"
          >
            <Home className="w-6 h-6 text-primary" />
            <span className="sr-only">Início</span>
          </Button>
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 font-serif text-xl md:text-2xl text-foreground font-medium select-none">
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Leonardo
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Débora
          </span>
        </h1>
        <div className="w-8 md:w-10" />
      </div>
    </header>
  );
};

export default SiteHeader;
