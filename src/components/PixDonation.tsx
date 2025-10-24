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
    } catch (error) {
      toast({
        title: "Falha ao copiar",
        description: "Por favor, copie a chave Pix manualmente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-background to-accent/20">
      <div className="max-w-2xl mx-auto">
        {/* Introdução */}
        <div className="text-center mb-12 animate-fadeIn">
          <Heart className="w-14 h-14 text-primary mx-auto mb-4 animate-pulse" />
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Contribua com Pix
          </h2>
          <p className="text-muted-foreground italic max-w-xl mx-auto text-lg">
            Seu amor e generosidade significam o mundo para nós. Obrigado por
            nos ajudar a construir nosso futuro juntos.
          </p>
        </div>

        {/* Card Pix */}
        <Card className="border-2 border-primary/20 shadow-2xl hover:shadow-3xl transition-shadow duration-300">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-serif text-2xl md:text-3xl">
              Envie seu presente via Pix
            </CardTitle>
            <CardDescription className="text-base md:text-lg">
              Escaneie o QR code ou copie nossa chave Pix
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
                <Image
                  src={PIX_QR_CODE}
                  width={240}
                  height={240}
                  draggable="false"
                  alt="Pix QR Code"
                  className="w-60 h-60"
                  data-testid="img-pix-qr"
                />
              </div>
            </div>

            {/* Chave Pix com botão */}
            <div className="space-y-2">
              <label
                htmlFor="pix-key"
                className="text-sm font-medium text-foreground"
              >
                Chave Pix
              </label>
              <div className="flex gap-2">
                <Input
                  id="pix-key"
                  value={PIX_KEY}
                  readOnly
                  className="font-mono text-sm flex-1"
                  data-testid="input-pix-key"
                />
                <Button
                  onClick={copyPixKey}
                  variant={copied ? "secondary" : "outline"}
                  size="icon"
                  className="shrink-0"
                  data-testid="button-copy-pix"
                  aria-label="Copiar chave Pix"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>

            {/* Mensagem final */}
            <div className="text-center pt-4">
              <p className="text-sm md:text-base text-muted-foreground">
                Cada contribuição, grande ou pequena, significa muito para nós.
                <br />
                Obrigado por fazer parte do nosso dia especial!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
