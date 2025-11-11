"use client";

import { useQuery } from "@tanstack/react-query";
import { GiftCard } from "@/components/GiftCard";
import { Gift as GiftIcon } from "lucide-react";
import type { Gift } from "@/shared/schema";
import { FloatingPetals } from "@/components/FloatingPetals";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

export default function Gifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`],
  });

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/80 to-accent/10 overflow-hidden">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-0 md:-left-36 opacity-[0.15] md:opacity-[0.2] scale-90 md:scale-100">
          <Image
            src={leftFlower}
            alt="Flor esquerda"
            className="animate-floral-slow"
            draggable="false"
          />
        </div>
        <div className="absolute -right-20 bottom-0 md:-right-32 opacity-[0.12] md:opacity-[0.18] scale-90 md:scale-100">
          <Image
            src={rightFlower}
            alt="Flor direita"
            className="animate-floral"
            draggable="false"
          />
        </div>
      </div>

      {/* Pétalas suaves */}
      <FloatingPetals />

      {/* Conteúdo */}
      <main className="relative max-w-7xl mx-auto px-4 py-20 animate-fadeIn">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <GiftIcon className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <h2
            className="font-serif text-4xl md:text-5xl text-primary mb-4 tracking-wide"
            data-testid="text-registry-title"
          >
            Escolha um Presente para Nós
          </h2>
          <p
            className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed font-light"
            data-testid="text-registry-description"
          >
            Sua generosidade ilumina nosso novo começo. 💕 Cada presente é um
            gesto de amor que fará parte da nossa história.
          </p>
          <div className="w-24 h-[1px] bg-primary/30 rounded-full mx-auto mt-8" />
        </div>

        {/* Lista de presentes */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : gifts && gifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {gifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <GiftIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Nenhum presente disponível no momento
            </h3>
            <p className="text-muted-foreground text-sm">
              A lista será atualizada em breve com novas opções 💝
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
