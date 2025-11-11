"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift as GiftIcon, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Gift } from "@/shared/schema";
import Image from "next/image";
import { motion } from "framer-motion";

interface GiftCardProps {
  gift: Gift;
}

export function GiftCard({ gift }: Readonly<GiftCardProps>) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group"
    >
      {/* Efeito luminoso suave */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 pointer-events-none" />

      <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl transition-all duration-500 hover:shadow-xl hover:border-primary/30">
        {/* Imagem */}
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={gift.imageUrl}
              alt={gift.title}
              fill
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              data-testid={`img-gift-${gift.id}`}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

            {gift.reserved && (
              <div className="absolute top-3 right-3">
                <Badge
                  variant="default"
                  className="bg-primary/90 text-white backdrop-blur-sm shadow-sm gap-1"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Reservado
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Conteúdo */}
        <CardContent className="p-6 text-center">
          <h3
            className="font-serif text-xl font-medium text-foreground mb-2 group-hover:text-primary transition-colors duration-300"
            data-testid={`text-gift-title-${gift.id}`}
          >
            {gift.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {gift.description}
          </p>
        </CardContent>

        {/* Rodapé com botão */}
        <CardFooter className="p-6 pt-0">
          <Link
            href={`/gifts/${gift.id}`}
            className="w-full"
            data-testid={`link-gift-${gift.id}`}
          >
            <Button
              variant="outline"
              className="w-full gap-2 rounded-full border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
              data-testid={`button-view-gift-${gift.id}`}
            >
              <GiftIcon className="w-4 h-4" />
              Ver Detalhes
            </Button>
          </Link>
        </CardFooter>

        {/* Pétalas decorativas sutis */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary/10 rounded-full blur-xl opacity-50 animate-pulse" />
        <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-primary/5 rounded-full blur-2xl opacity-40 animate-fadeIn" />
      </Card>
    </motion.div>
  );
}
