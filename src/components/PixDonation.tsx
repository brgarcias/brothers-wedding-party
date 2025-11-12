"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Check, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import PIX_QR_CODE from "@images/pix-qr.svg";
import { motion } from "framer-motion";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

const PIX_KEY = "leonardo.debora.casamento@email.com";

export function PixDonation() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyPixKey = async () => {
    try {
      await navigator.clipboard.writeText(PIX_KEY);
      setCopied(true);
      toast({
        title: "Chave Pix copiada!",
        description: "A chave Pix foi copiada para sua área de transferência.",
      });
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast({
        title: "Falha ao copiar",
        description: "Por favor, copie a chave Pix manualmente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative py-32 px-6 overflow-hidden bg-gradient-to-b from-accent/30 via-background to-background">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-20 top-10 opacity-[0.15] animate-floral">
          <Image src={leftFlower} alt="Flor esquerda" draggable="false" />
        </div>
        <div className="absolute -right-24 bottom-10 opacity-[0.15] animate-floral-slow">
          <Image src={rightFlower} alt="Flor direita" draggable="false" />
        </div>
      </div>

      <div className="relative max-w-3xl mx-auto text-center animate-fadeIn space-y-12">
        {/* Cabeçalho */}
        <div className="flex flex-col items-center gap-4">
          <Heart className="w-14 h-14 text-primary animate-pulse-slow drop-shadow-md" />
          <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-wide drop-shadow-sm">
            Contribua com Pix
          </h2>
          <p className="text-muted-foreground italic max-w-2xl text-lg md:text-xl font-light leading-relaxed">
            Seu carinho e generosidade tornam esse momento ainda mais especial.
            Agradecemos por compartilhar conosco o início dessa nova etapa. 💖
          </p>
        </div>

        {/* Card Pix */}
        <Card className="border border-primary/20 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl hover:shadow-[0_0_40px_rgba(122,122,122,0.2)] transition-all duration-500">
          <CardHeader className="text-center pb-8">
            <CardTitle className="font-serif text-2xl md:text-3xl text-foreground">
              Envie seu presente com amor
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              Escaneie o QR Code ou copie nossa chave Pix abaixo
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-10">
            {/* QR Code */}
            <div className="flex justify-center">
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-2xl shadow-lg"
              >
                <Image
                  src={PIX_QR_CODE}
                  width={240}
                  height={240}
                  draggable="false"
                  alt="Pix QR Code"
                  className="w-60 h-60"
                />
              </motion.div>
            </div>

            {/* Chave Pix */}
            <div className="space-y-2 text-left">
              <label
                htmlFor="pix-key"
                className="text-sm font-medium text-foreground/90"
              >
                Chave Pix
              </label>
              <div className="flex gap-2">
                <Input
                  id="pix-key"
                  value={PIX_KEY}
                  readOnly
                  className="font-mono text-sm flex-1 bg-white/10 border-white/20 text-foreground"
                />
                <Button
                  onClick={copyPixKey}
                  variant={copied ? "secondary" : "outline"}
                  size="icon"
                  className="shrink-0 transition-all"
                  aria-label="Copiar chave Pix"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5 text-primary" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mensagem final */}
            <p className="text-sm md:text-base text-muted-foreground/90 text-center leading-relaxed">
              Cada contribuição é uma semente de amor plantada no início da
              nossa jornada. 🌷 Obrigado por fazer parte deste momento!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
