"use client";

import { Link } from "wouter";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const SiteHeader = () => {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" data-testid="link-home">
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            data-testid="button-home"
          >
            <Home className="w-4 h-4" />
            Início
          </Button>
        </Link>
        <h1 className="font-serif text-2xl md:text-3xl text-foreground">
          Lista de Presentes
        </h1>
        <div className="w-20" />
      </div>
    </header>
  );
};

export default SiteHeader;
