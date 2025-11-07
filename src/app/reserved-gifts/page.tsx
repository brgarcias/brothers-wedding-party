"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Gift as GiftIcon, CheckCircle2, User2, Search } from "lucide-react";
import type { Gift } from "@/shared/schema";
import Image from "next/image";

export default function ReservedGifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`],
  });

  const [filter, setFilter] = useState("");

  // Filtra apenas os presentes reservados
  const reservedGifts = gifts?.filter((gift) => gift.reserved) ?? [];

  // Aplica filtro por nome do convidado OU título do presente
  const filteredGifts = useMemo(() => {
    if (!filter.trim()) return reservedGifts;
    const lowerFilter = filter.toLowerCase();
    return reservedGifts.filter(
      (gift) =>
        gift.reservedBy?.toLowerCase().includes(lowerFilter) ||
        gift.title.toLowerCase().includes(lowerFilter)
    );
  }, [reservedGifts, filter]);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Cabeçalho */}
        <div className="text-center mb-12 animate-fadeIn">
          <GiftIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3">
            Presentes Reservados
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Aqui você pode conferir todos os presentes já reservados. Use o
            campo de busca abaixo para filtrar por nome do convidado ou nome do
            presente.
          </p>
        </div>

        {/* Filtro */}
        <div className="max-w-md mx-auto mb-10 animate-fadeIn">
          <Label
            htmlFor="filter"
            className="text-sm font-medium text-foreground"
          >
            Buscar por nome do convidado ou nome do presente
          </Label>
          <div className="relative mt-2">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="filter"
              type="text"
              placeholder="Ex: Ana / Liquidificador / Jogo de lençol..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        {/* Conteúdo */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {filteredGifts.map((gift) => (
              <Card
                key={gift.id}
                className="overflow-hidden group transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <CardHeader className="p-0 relative">
                  <div className="aspect-square overflow-hidden bg-muted">
                    <Image
                      src={gift.imageUrl}
                      alt={gift.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant="default"
                      className="bg-primary/90 backdrop-blur-sm gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      Reservado
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-3">
                  <CardTitle className="font-serif text-xl text-foreground">
                    {gift.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {gift.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm mt-2 text-primary">
                    <User2 className="w-4 h-4" />
                    <span>
                      {gift.reservedBy
                        ? `Reservado por ${gift.reservedBy}`
                        : "Nome não informado"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <GiftIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            {reservedGifts.length === 0 ? (
              <>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  Nenhum presente reservado ainda
                </h3>
                <p className="text-muted-foreground">
                  Assim que alguém reservar um presente, ele aparecerá aqui.
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-medium text-foreground mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground">
                  Nenhum presente ou convidado corresponde a “{filter}”.
                </p>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
