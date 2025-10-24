"use client";

import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Gift } from "@/shared/schema";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  Heart,
  ShoppingCart,
  ExternalLink,
} from "lucide-react";
import { useParams } from "next/navigation";

export default function GiftDetail() {
  const params = useParams();
  const giftId = params?.id as string;
  const [guestName, setGuestName] = useState("");
  const { toast } = useToast();

  const { data: gift, isLoading } = useQuery<Gift>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`, giftId],
    enabled: !!giftId,
  });

  const reserveMutation = useMutation({
    mutationFn: async (name: string) => {
      return await apiRequest("POST", `/api/gifts/${giftId}/reserve`, {
        guestName: name,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gifts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gifts", giftId] });
      toast({
        title: "Presente reservado!",
        description:
          "Obrigado pela sua generosidade. Nós ficaremos muito gratos!",
      });
      setGuestName("");
    },
    onError: () => {
      toast({
        title: "Reserva falhou",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleReserve = () => {
    if (!guestName.trim()) {
      toast({
        title: "Nome é obrigatório",
        description: "Por favor, insira seu nome para reservar este presente.",
        variant: "destructive",
      });
      return;
    }
    reserveMutation.mutate(guestName);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Carregando..</div>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-foreground mb-2">
            Presente não encontrado
          </h2>
          <Link href="/gifts">
            <Button variant="outline" className="mt-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para a lista de presentes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] bg-muted overflow-hidden">
        <Image
          src={gift.imageUrl}
          alt={gift.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/60 to-transparent" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center space-y-4 max-w-2xl px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-foreground drop-shadow-lg">
            {gift.title}
          </h1>
          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
            {gift.description}
          </p>
          {gift.reserved && (
            <Badge
              variant="default"
              className="bg-primary/90 text-white shadow-md gap-1"
            >
              <CheckCircle2 className="w-3 h-3" />
              Reservado
            </Badge>
          )}
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12 animate-fadeIn">
        {/* Personal Note */}
        <Card className="bg-accent/40 backdrop-blur-sm border-accent-border shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-serif flex items-center gap-2 text-primary">
              <Heart className="w-5 h-5" fill="currentColor" />
              Uma Mensagem de Leonardo & Débora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground italic leading-relaxed text-center md:text-left">
              {gift.personalNote}
            </p>
          </CardContent>
        </Card>

        {/* Onde Comprar + Reserva */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Onde Comprar */}
          <Card className="border-muted shadow-sm">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-foreground">
                Onde Comprar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gift.purchaseLinks.map((link, index) => {
                const linkText = link.includes("amazon")
                  ? "Amazon"
                  : link.includes("mercadolivre")
                  ? "Mercado Livre"
                  : link.includes("shopee")
                  ? "Shopee"
                  : `Loja ${index + 1}`;
                return (
                  <a
                    key={link}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-between gap-2 hover:bg-primary/10 transition"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Comprar em {linkText}</span>
                      </div>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </a>
                );
              })}
            </CardContent>
          </Card>

          {/* Reserva */}
          {!gift.reserved ? (
            <Card className="border-primary/20 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg font-serif">
                  Reserve Este Presente
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guestName">Seu Nome</Label>
                  <Input
                    id="guestName"
                    placeholder="Digite seu nome"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    disabled={reserveMutation.isPending}
                  />
                </div>
                <Button
                  onClick={handleReserve}
                  disabled={reserveMutation.isPending}
                  className="w-full gap-2 bg-primary text-white hover:bg-primary/90"
                >
                  <Heart className="w-4 h-4" />
                  {reserveMutation.isPending
                    ? "Reservando..."
                    : "Reservar Presente"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Reservar ajuda a evitar duplicidade de presentes 💝
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-muted border-muted-foreground/20 shadow-sm text-center">
              <CardContent className="pt-8 pb-6">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">
                  Este presente já foi reservado!
                </h3>
                <p className="text-sm text-muted-foreground">
                  {gift.reservedBy
                    ? `Reservado por ${gift.reservedBy}`
                    : "Este presente não está mais disponível"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
