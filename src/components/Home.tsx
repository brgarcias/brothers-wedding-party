"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FloatingPetals } from "@/components/FloatingPetals";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PixDonation } from "@/components/PixDonation";
import { Heart, Gift, Mail } from "lucide-react";
import heroImage from "@images/Romantic_wedding_couple_hero_image_bd6453e6.png";
import Image from "next/image";

export default function Home() {
  const weddingDate = new Date("2025-12-20T15:00:00");

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
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/50" />
        </div>

        {/* Floating Petals */}
        <FloatingPetals />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto animate-fadeIn space-y-6">
          <h1 className="font-cursive text-4xl md:text-5xl text-white drop-shadow-lg">
            Para sempre começa aqui
          </h1>

          <div className="font-serif text-5xl md:text-7xl text-white mb-2 font-light">
            Leonardo <span className="text-primary">&</span> Débora
          </div>

          <p className="text-xl md:text-2xl text-white/90 font-light">
            10 / Março / 2026
          </p>

          <div className="mt-12 max-w-lg mx-auto">
            <CountdownTimer targetDate={weddingDate} />
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/gifts">
              <Button
                size="lg"
                className="bg-white/95 text-foreground hover:bg-white transition-all duration-300 gap-2 backdrop-blur-sm"
              >
                <Gift className="w-5 h-5" />
                Ver Lista de Presentes
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 transition-all duration-300 gap-2 backdrop-blur-sm"
              >
                <Mail className="w-5 h-5" />
                Envie seus votos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="py-24 px-6 bg-card">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn space-y-8">
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-4"
            fill="currentColor"
          />
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-6">
            Nossa História de Amor
          </h2>

          <div className="prose prose-lg mx-auto text-muted-foreground">
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
        </div>
      </section>

      {/* Pix Donation Section */}
      <PixDonation />
    </div>
  );
}
