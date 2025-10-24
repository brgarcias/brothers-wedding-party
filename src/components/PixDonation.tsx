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

const PIX_KEY = "leonardo.debora.casamento@email.com";
const PIX_QR_CODE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect fill='white' width='200' height='200'/%3E%3Cg fill='black'%3E%3Crect x='20' y='20' width='20' height='20'/%3E%3Crect x='40' y='20' width='20' height='20'/%3E%3Crect x='60' y='20' width='20' height='20'/%3E%3Crect x='80' y='20' width='20' height='20'/%3E%3Crect x='100' y='20' width='20' height='20'/%3E%3Crect x='120' y='20' width='20' height='20'/%3E%3Crect x='140' y='20' width='20' height='20'/%3E%3Crect x='20' y='40' width='20' height='20'/%3E%3Crect x='140' y='40' width='20' height='20'/%3E%3Crect x='20' y='60' width='20' height='20'/%3E%3Crect x='60' y='60' width='20' height='20'/%3E%3Crect x='80' y='60' width='20' height='20'/%3E%3Crect x='100' y='60' width='20' height='20'/%3E%3Crect x='140' y='60' width='20' height='20'/%3E%3Crect x='20' y='80' width='20' height='20'/%3E%3Crect x='60' y='80' width='20' height='20'/%3E%3Crect x='80' y='80' width='20' height='20'/%3E%3Crect x='100' y='80' width='20' height='20'/%3E%3Crect x='140' y='80' width='20' height='20'/%3E%3Crect x='20' y='100' width='20' height='20'/%3E%3Crect x='60' y='100' width='20' height='20'/%3E%3Crect x='80' y='100' width='20' height='20'/%3E%3Crect x='100' y='100' width='20' height='20'/%3E%3Crect x='140' y='100' width='20' height='20'/%3E%3Crect x='20' y='120' width='20' height='20'/%3E%3Crect x='140' y='120' width='20' height='20'/%3E%3Crect x='20' y='140' width='20' height='20'/%3E%3Crect x='40' y='140' width='20' height='20'/%3E%3Crect x='60' y='140' width='20' height='20'/%3E%3Crect x='80' y='140' width='20' height='20'/%3E%3Crect x='100' y='140' width='20' height='20'/%3E%3Crect x='120' y='140' width='20' height='20'/%3E%3Crect x='140' y='140' width='20' height='20'/%3E%3Crect x='40' y='160' width='20' height='20'/%3E%3Crect x='100' y='160' width='20' height='20'/%3E%3Crect x='120' y='160' width='20' height='20'/%3E%3C/g%3E%3C/svg%3E";

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
        <div className="text-center mb-12 animate-fadeIn">
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-4"
            fill="currentColor"
          />
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-4">
            Contribua com Pix
          </h2>
          <p className="text-muted-foreground italic max-w-xl mx-auto">
            &quot;Seu amor e generosidade significam o mundo para nós. Obrigado
            por nos ajudar a construir nosso futuro juntos.&quot;
          </p>
        </div>

        <Card className="border-2 border-primary/20 shadow-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="font-serif text-2xl">
              Envie seu presente via Pix
            </CardTitle>
            <CardDescription>
              Escaneie o código QR ou copie nossa chave Pix
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <Image
                  src={PIX_QR_CODE}
                  alt="Pix QR Code"
                  className="w-48 h-48"
                  data-testid="img-pix-qr"
                />
              </div>
            </div>

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
                  className="font-mono text-sm"
                  data-testid="input-pix-key"
                />
                <Button
                  onClick={copyPixKey}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                  data-testid="button-copy-pix"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
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
