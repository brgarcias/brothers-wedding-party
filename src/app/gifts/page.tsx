"use client";

import { useQuery } from "@tanstack/react-query";
import { GiftCard } from "@/components/GiftCard";
import { Gift as GiftIcon } from "lucide-react";
import type { Gift } from "@/shared/schema";

export default function Gifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <GiftIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2
            className="font-serif text-3xl md:text-4xl text-foreground mb-4"
            data-testid="text-registry-title"
          >
            Escolha um Presente para Nós
          </h2>
          <p
            className="text-muted-foreground max-w-2xl mx-auto"
            data-testid="text-registry-description"
          >
            Sua generosidade significa o mundo para nós. Cada presente nos ajuda
            a começar nossa nova vida juntos. Clique em qualquer item para ver
            os detalhes e opções de compra.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : gifts && gifts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {gifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <GiftIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">
              Sem presentes disponíveis no momento
            </h3>
            <p className="text-muted-foreground">
              A lista de presentes estará disponível em breve.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
