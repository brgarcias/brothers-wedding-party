"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Home } from "lucide-react";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-card/70 to-accent/20 px-6 overflow-hidden">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-16 top-0 opacity-[0.15] md:opacity-[0.18]"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={leftFlower} alt="flor esquerda" draggable="false" />
        </motion.div>

        <motion.div
          className="absolute -right-20 bottom-0 opacity-[0.15] md:opacity-[0.18]"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={rightFlower} alt="flor direita" draggable="false" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-center py-10 px-6">
          <CardContent className="space-y-6">
            <AlertCircle className="h-12 w-12 text-primary mx-auto mb-2 animate-pulse" />
            <h1 className="font-serif text-3xl text-primary mb-3">
              Ops! Página não encontrada
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Parece que você se perdeu pelo caminho.
              <br />
              Volte para o início e siga o amor 🌿
            </p>

            <Link href="/" passHref>
              <Button
                size="lg"
                variant="outline"
                className="mt-4 gap-2 bg-white/10 border-white/30 hover:bg-white/20 text-black backdrop-blur-sm transition-all duration-300 rounded-full"
              >
                <Home className="w-5 h-5" />
                Voltar para o Início
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mensagem sutil abaixo */}
      <p className="mt-8 text-sm text-muted-foreground/80 text-center max-w-xs font-light">
        Se você digitou a URL manualmente, verifique se está correta.
      </p>
    </div>
  );
}
