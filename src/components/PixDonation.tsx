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
    } catch {
      toast({
        title: "Falha ao copiar",
        description: "Por favor, copie a chave Pix manualmente.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-28 px-6 bg-gradient-to-t from-accent/20 via-background to-background">
      <div className="max-w-2xl mx-auto text-center animate-fadeIn space-y-12">
        <div className="flex flex-col items-center gap-4">
          <Heart className="w-14 h-14 text-primary animate-pulse-slow" />
          <h2 className="font-serif text-4xl md:text-5xl text-primary tracking-wide">
            Contribua com Pix
          </h2>
          <p className="text-muted-foreground italic max-w-xl text-lg font-light">
            Seu amor e generosidade significam o mundo para nós. Obrigado por
            nos ajudar a construir nosso futuro juntos.
          </p>
        </div>

        <Card className="border border-primary/20 bg-white/5 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500">
          <CardHeader className="text-center pb-6">
            <CardTitle className="font-serif text-2xl md:text-3xl text-foreground">
              Envie seu presente via Pix
            </CardTitle>
            <CardDescription className="text-base md:text-lg text-muted-foreground">
              Escaneie o QR code ou copie nossa chave Pix
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white p-6 rounded-2xl shadow-lg hover:scale-[1.03] transition-transform duration-500">
                <Image
                  src={PIX_QR_CODE}
                  width={240}
                  height={240}
                  draggable="false"
                  alt="Pix QR Code"
                  className="w-60 h-60"
                />
              </div>
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
              Cada contribuição, grande ou pequena, é um gesto de amor. Obrigado
              por fazer parte do nosso dia especial!
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
