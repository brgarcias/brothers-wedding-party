"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingPetals } from "@/components/FloatingPetals";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PixDonation } from "@/components/PixDonation";
import { Gift, Heart, Mail } from "lucide-react";
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
      {/* Love Story Section */}
      <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-card/70 to-accent/10">
        {/* Fundo decorativo */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Flores */}
          <div className="absolute -left-24 top-0 opacity-[0.12] animate-floral">
            <Image src={leftFlower} alt="Flor esquerda" draggable="false" />
          </div>
          <div className="absolute -right-28 bottom-0 opacity-[0.12] animate-floral-slow">
            <Image src={rightFlower} alt="Flor direita" draggable="false" />
          </div>
          {/* Luz suave central */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/70 to-transparent" />
        </div>

        {/* Conteúdo */}
        <div className="relative max-w-5xl mx-auto text-center animate-fadeIn space-y-16">
          <div className="space-y-4">
            <h2 className="font-serif text-5xl md:text-6xl text-primary drop-shadow-sm">
              Nossa História de Amor
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl italic">
              “O amor é composto por uma só alma habitando dois corpos.” —
              Aristóteles
            </p>
          </div>

          {/* Texto com efeito de vidro */}
          <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg p-10 md:p-14 space-y-8 leading-relaxed text-lg text-foreground/90 font-light">
            <p>
              A história de{" "}
              <span className="font-medium text-primary">Leonardo</span> e{" "}
              <span className="font-medium text-primary">Débora</span> começou
              por acaso — um sorriso, uma conversa e uma conexão instantânea.
              Com o tempo, essa conexão se transformou em um amor que floresceu,
              cheio de risadas, cumplicidade e sonhos compartilhados.
            </p>
            <p>
              Agora, eles estão prontos para celebrar essa linda jornada com
              todos aqueles que fizeram parte dela. Juntos, iniciam um novo
              capítulo de amor, fé e eternidade.
            </p>
          </div>

          {/* Ornamento */}
          <div className="relative flex justify-center pt-8">
            <div className="w-32 h-[2px] bg-primary/40 rounded-full shadow-[0_0_10px_hsl(122_16%_55%_/_0.4)]" />
            <Heart className="absolute -top-3 text-primary animate-pulse w-6 h-6 bg-background rounded-full p-1 shadow-sm" />
          </div>
        </div>
      </section>

      {/* Pix Donation Section */}
      <PixDonation />
    </div>
  );
}
