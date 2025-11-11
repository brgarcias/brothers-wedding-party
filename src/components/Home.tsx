"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingPetals } from "@/components/FloatingPetals";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PixDonation } from "@/components/PixDonation";
import { Gift, Mail } from "lucide-react";
import heroImage from "@images/banner.jpeg";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import Image from "next/image";

export default function Home() {
  const weddingDate = new Date("2026-03-07T10:00:00");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 -z-10">
          <Image
            draggable="false"
            src={heroImage}
            alt="Leonardo & Débora"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Escurecimento suave para melhorar leitura */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />
        </div>

        {/* Floating Petals */}
        <FloatingPetals />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fadeIn space-y-8">
          {/* Frase cursiva */}
          <h2 className="font-cursive text-3xl md:text-4xl text-white/90 drop-shadow-md tracking-wide">
            Para sempre começa aqui
          </h2>

          {/* Nomes */}
          <h1 className="font-serif text-6xl md:text-7xl text-white font-light tracking-wide">
            Leonardo{" "}
            <span className="text-primary font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.3)]">
              &
            </span>{" "}
            Débora
          </h1>

          {/* Data */}
          <p className="text-lg md:text-xl text-white/80 font-light uppercase tracking-[0.25em]">
            7 • Março • 2026
          </p>

          {/* Contador */}
          <div className="mt-10 max-w-lg mx-auto">
            <CountdownTimer targetDate={weddingDate} />
          </div>

          {/* Botões */}
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link href="/gifts">
              <Button
                size="lg"
                className="bg-white/95 text-foreground hover:bg-white transition-all duration-300 gap-2 px-6 py-3 rounded-full shadow-sm"
              >
                <Gift className="w-5 h-5 text-primary" />
                Ver Lista de Presentes
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/40 hover:bg-white/20 transition-all duration-300 gap-2 px-6 py-3 rounded-full backdrop-blur-sm"
              >
                <Mail className="w-5 h-5 text-white" />
                Envie seus votos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-card/80 to-accent/10">
        {/* Background floral e ornamentos */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Flor esquerda */}
          <div className="absolute -left-20 top-0 md:-left-32 opacity-[0.15] md:opacity-[0.18] scale-90 md:scale-100">
            <Image
              src={leftFlower}
              alt="left-flower"
              className="flower-soft animate-floral"
              draggable="false"
            />
          </div>

          <div className="absolute -right-16 bottom-0 md:-right-28 opacity-[0.12] md:opacity-[0.18] scale-90 md:scale-100">
            <Image
              src={rightFlower}
              alt="right-flower"
              className="flower-soft animate-floral-slow"
              draggable="false"
            />
          </div>

          {/* Luz suave central */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/60" />
        </div>

        {/* Conteúdo */}
        <div className="relative max-w-3xl mx-auto text-center animate-fadeIn space-y-10">
          <h2 className="font-serif text-4xl md:text-5xl text-primary mb-6 tracking-wide drop-shadow-sm">
            Nossa História de Amor
          </h2>

          <div className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed space-y-8 font-light backdrop-blur-[1px] px-4 md:px-0">
            <p>
              A história de Leonardo e Débora começou por acaso — um sorriso,
              uma conversa, e uma conexão instantânea. Com o tempo, essa conexão
              cresceu para algo mais profundo: amor, risadas e memórias
              infinitas.
            </p>
            <p>
              Agora, eles estão prontos para celebrar sua união com a família e
              amigos que fizeram parte de sua jornada. Junte-se a nós enquanto
              começamos este lindo novo capítulo juntos.
            </p>
          </div>

          {/* Ornamento inferior */}
          <div className="flex justify-center pt-8">
            <div className="w-24 h-[1px] bg-primary/30 rounded-full shadow-[0_0_6px_hsl(122_16%_55%_/_0.3)]" />
          </div>
        </div>
      </section>

      {/* Pix Donation Section */}
      <PixDonation />
    </div>
  );
}
