"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Gift as GiftIcon,
  CheckCircle2,
  User2,
  Search,
  Loader2,
} from "lucide-react";
import type { Gift } from "@/shared/schema";
import Image from "next/image";
import { motion } from "framer-motion";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

export default function ReservedGifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`],
  });

  const [filter, setFilter] = useState("");

  const totalGifts = gifts?.length ?? 0;
  const reservedGifts = gifts?.filter((gift) => gift.reserved) ?? [];

  const filteredGifts = useMemo(() => {
    if (!filter.trim()) return reservedGifts;
    const lower = filter.toLowerCase();
    return reservedGifts.filter(
      (gift) =>
        gift.title.toLowerCase().includes(lower) ||
        gift.reservedBy?.toLowerCase().includes(lower)
    );
  }, [reservedGifts, filter]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/60 to-accent/20 overflow-hidden">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-24 top-0 opacity-[0.12] md:opacity-[0.18]"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={leftFlower} alt="Flor esquerda" draggable="false" />
        </motion.div>
        <motion.div
          className="absolute -right-28 bottom-0 opacity-[0.12] md:opacity-[0.18]"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={rightFlower} alt="Flor direita" draggable="false" />
        </motion.div>
      </div>

      {/* Cabeçalho */}
      <section className="relative text-center py-16 px-4 space-y-5 animate-fadeIn">
        <GiftIcon
          className="w-12 h-12 text-primary mx-auto"
          fill="currentColor"
        />
        <h1 className="font-serif text-4xl md:text-5xl text-foreground tracking-wide">
          Presentes Reservados
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
          Veja todos os presentes que já foram reservados com carinho. Use a
          busca abaixo para filtrar por nome do convidado ou presente.
        </p>

        {/* Estatísticas */}
        {totalGifts > 0 && (
          <div className="flex justify-center items-center gap-4 text-sm md:text-base text-muted-foreground mt-4">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="text-primary font-semibold">
                {reservedGifts.length}
              </span>{" "}
              reservados
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
              <span className="text-white/90 font-semibold">{totalGifts}</span>{" "}
              total de presentes
            </div>
          </div>
        )}
      </section>

      {/* Campo de busca */}
      <section className="relative max-w-md mx-auto mb-14 px-4 animate-fadeIn">
        <Label htmlFor="filter" className="sr-only">
          Buscar presentes
        </Label>
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-primary/80" />
          <Input
            id="filter"
            type="text"
            placeholder="Buscar por nome ou presente..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/70 backdrop-blur-sm focus:border-primary/40 focus:ring-0"
          />
        </div>
      </section>

      {/* Conteúdo */}
      <main className="relative max-w-6xl mx-auto px-4 pb-20">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {filteredGifts.map((gift) => (
              <Card
                key={gift.id}
                className="group overflow-hidden bg-white/10 border-white/20 backdrop-blur-md rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader className="p-0 relative">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={gift.imageUrl}
                      alt={gift.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-primary/90 backdrop-blur-sm text-white gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Reservado
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="p-6 space-y-3 text-center">
                  <CardTitle className="font-serif text-lg md:text-xl text-white">
                    {gift.title}
                  </CardTitle>
                  <p className="text-sm text-white/70 line-clamp-2">
                    {gift.description}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm mt-3 text-primary font-medium">
                    <User2 className="w-4 h-4" />
                    {gift.reservedBy ? (
                      <span>Reservado por {gift.reservedBy}</span>
                    ) : (
                      <span>Nome não informado</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 space-y-3 animate-fadeIn">
            <GiftIcon className="w-16 h-16 text-muted-foreground/60 mx-auto mb-2" />
            {reservedGifts.length === 0 ? (
              <>
                <h3 className="text-xl font-serif text-foreground">
                  Nenhum presente reservado ainda
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Assim que alguém reservar um presente, ele aparecerá aqui 💝
                </p>
              </>
            ) : (
              <>
                <h3 className="text-xl font-serif text-foreground">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
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
