"use client";

import { useQuery } from "@tanstack/react-query";
import { Mail, User, MessageCircle, Loader2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/shared/schema";

export default function MessagesPage() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<Message[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/messages`],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent/20">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    toast({
      title: "Erro ao carregar mensagens",
      description: "Não foi possível buscar as mensagens agora.",
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      <main className="max-w-4xl mx-auto px-4 py-12 space-y-6">
        {(!data || data.length === 0) && (
          <Card className="text-center py-12 shadow-md border-2 border-primary/20">
            <CardContent>
              <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-serif text-2xl mb-2">
                Nenhuma mensagem ainda
              </h2>
              <p className="text-muted-foreground">
                As mensagens enviadas pelo formulário aparecerão aqui ❤️
              </p>
            </CardContent>
          </Card>
        )}

        {data?.map((msg) => (
          <Card
            key={msg.id}
            className="border-2 border-primary/20 shadow-md hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                {msg.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" /> {msg.email}
              </p>
              <p className="text-foreground whitespace-pre-wrap mt-4 border-t pt-4">
                {msg.message}
              </p>
              {msg.createdAt && (
                <p className="text-xs text-muted-foreground mt-4">
                  Enviado em{" "}
                  {new Date(msg.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </main>
    </div>
  );
}
