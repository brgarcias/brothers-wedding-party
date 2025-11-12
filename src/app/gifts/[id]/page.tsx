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
  Copy,
  Check,
} from "lucide-react";
import { useParams } from "next/navigation";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import PIX_QR_CODE from "@images/qrcode-pix.png";
import { motion } from "framer-motion";

const DEFAULT_PIX_KEY = "leonardo.debora.casamento@email.com";

export default function GiftDetail() {
  const params = useParams();
  const giftId = params?.id as string;
  const [guestName, setGuestName] = useState("");
  const [copiedPix, setCopiedPix] = useState(false);
  const { toast } = useToast();

  const { data: gift, isLoading } = useQuery<Gift>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`, giftId],
    enabled: !!giftId,
  });

  const reserveMutation = useMutation({
    mutationFn: async (name: string) =>
      apiRequest(
        "POST",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/${giftId}/reserve`,
        { guestName: name }
      ),
    onSuccess: () => {
      queryClient.invalidateQueries();
      toast({
        title: "Presente reservado 💝",
        description: "Agradecemos imensamente pelo seu carinho e generosidade!",
      });
      setGuestName("");
    },
    onError: () =>
      toast({
        title: "Erro ao reservar",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      }),
  });

  const handleReserve = () => {
    if (!guestName.trim()) {
      toast({
        title: "Informe seu nome",
        description: "Por favor, insira seu nome para reservar este presente.",
        variant: "destructive",
      });
      return;
    }
    reserveMutation.mutate(guestName);
  };

  const copyPixKey = async (key: string) => {
    try {
      await navigator.clipboard.writeText(key);
      setCopiedPix(true);
      toast({
        title: "Chave Pix copiada!",
        description: "A chave Pix foi copiada para sua área de transferência.",
      });
      setTimeout(() => setCopiedPix(false), 3000);
    } catch {
      toast({
        title: "Falha ao copiar",
        description: "Por favor, copie a chave Pix manualmente.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background to-accent/20 px-6 text-center space-y-6">
        <h2 className="text-3xl font-serif text-primary">
          Presente não encontrado
        </h2>
        <Link href="/gifts">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar à lista de presentes
          </Button>
        </Link>
      </div>
    );
  }

  const pixKey = (gift as any).pixKey ?? DEFAULT_PIX_KEY;
  const pixQrUrl = (gift as any).pixQrUrl ?? PIX_QR_CODE;

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/70 to-accent/20 overflow-hidden">
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

      {/* Hero */}
      <section className="relative w-full h-[45vh] sm:h-[55vh] md:h-[70vh] overflow-hidden">
        <Image
          src={gift.imageUrl}
          alt={gift.title}
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent" />

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center px-4 sm:px-6 space-y-3 max-w-lg">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white drop-shadow-lg">
            {gift.title}
          </h1>
          <p className="text-white/80 text-sm sm:text-base leading-relaxed">
            {gift.description}
          </p>
          {gift.reserved && (
            <Badge className="bg-primary/90 text-white shadow-sm gap-1">
              <CheckCircle2 className="w-3 h-3" />
              Reservado
            </Badge>
          )}
        </div>
      </section>

      {/* Conteúdo */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-20 space-y-12 animate-fadeIn">
        {/* Mensagem */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-md rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl font-serif flex items-center gap-2 text-primary text-center sm:text-left">
              <Heart className="w-5 h-5" fill="currentColor" />
              Uma mensagem de Leonardo & Débora
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground/90 italic leading-relaxed text-center">
              {gift.personalNote}
            </p>
          </CardContent>
        </Card>

        {/* PIX */}
        <Card className="border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle className="font-serif text-lg sm:text-xl text-primary text-center sm:text-left">
              Pagar via Pix (opcional)
            </CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-8">
            {/* QR */}
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <Image
                  src={pixQrUrl}
                  alt="QR Pix"
                  width={200}
                  height={200}
                  className="w-48 h-48"
                />
              </div>
            </div>

            {/* Chave Pix */}
            <div className="flex-1 w-full">
              <p className="text-muted-foreground mb-2 text-sm sm:text-base">
                Você pode pagar através do QR Code acima ou copiar a chave Pix:
              </p>

              <div className="flex flex-col sm:flex-row gap-3 items-center w-full">
                <Input
                  value={pixKey}
                  readOnly
                  className="font-mono text-sm bg-background/80 border-white/10 w-full"
                />
                <Button
                  onClick={() => copyPixKey(pixKey)}
                  variant={copiedPix ? "secondary" : "outline"}
                  className="w-full sm:w-auto shrink-0"
                >
                  {copiedPix ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground mt-3 text-center sm:text-left">
                Seu carinho é o maior presente de todos 💖
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Onde comprar + Reserva */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Onde comprar */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-sm rounded-2xl shadow-md">
            <CardHeader>
              <CardTitle className="font-serif text-lg sm:text-xl text-primary">
                Onde Comprar
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {gift.purchaseLinks.map((link, index) => {
                const site = link.includes("amazon")
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
                  >
                    <Button
                      variant="outline"
                      className="w-full justify-between hover:bg-primary/10 transition-all duration-300 gap-2"
                    >
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        <span>Comprar em {site}</span>
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
            <Card className="border-primary/20 bg-white/5 backdrop-blur-sm rounded-2xl shadow-md">
              <CardHeader>
                <CardTitle className="font-serif text-lg sm:text-xl text-primary">
                  Reserve este presente
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
                    className="bg-background/70 border-white/20"
                  />
                </div>
                <Button
                  onClick={handleReserve}
                  disabled={reserveMutation.isPending}
                  className="w-full gap-2 bg-primary text-white hover:bg-primary/90 transition"
                >
                  <Heart className="w-4 h-4" />
                  {reserveMutation.isPending
                    ? "Reservando..."
                    : "Reservar Presente"}
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Reservar ajuda a evitar duplicidade 💝
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-primary/5 border-primary/20 shadow-md rounded-2xl text-center">
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

        {/* Voltar */}
        <div className="text-center pt-6">
          <Link href="/gifts">
            <Button
              variant="ghost"
              className="gap-2 text-primary hover:text-primary/80"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar para a lista de presentes
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
