"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import { motion } from "framer-motion";

export default function ErrorPage() {
  const reloadPage = () => window.location.reload();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background via-card/70 to-accent/20 px-6 overflow-hidden">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-14 top-0 opacity-[0.15] md:opacity-[0.18]"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={leftFlower} alt="flor esquerda" draggable="false" />
        </motion.div>

        <motion.div
          className="absolute -right-20 bottom-0 opacity-[0.12] md:opacity-[0.18]"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={rightFlower} alt="flor direita" draggable="false" />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10"
      >
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl text-center py-10 px-6">
          <CardContent className="space-y-6">
            <AlertTriangle className="h-12 w-12 text-orange-400 mx-auto mb-2 animate-pulse" />
            <h1 className="font-serif text-3xl text-primary mb-3">
              Algo deu errado 😔
            </h1>
            <p className="text-muted-foreground text-lg font-light leading-relaxed">
              Ocorreu um erro inesperado.
              <br />
              Tente novamente em alguns instantes.
            </p>

            <Button
              onClick={reloadPage}
              size="lg"
              className="mt-4 gap-2 bg-primary/80 hover:bg-primary/90 text-white rounded-full transition-all duration-300"
            >
              <RefreshCcw className="w-5 h-5" />
              Atualizar Página
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Mensagem sutil abaixo */}
      <p className="mt-8 text-sm text-muted-foreground/80 text-center max-w-xs font-light">
        Se o problema persistir, entre em contato conosco 💌
      </p>
    </div>
  );
}
