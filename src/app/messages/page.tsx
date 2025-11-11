"use client";

import { useQuery } from "@tanstack/react-query";
import { Mail, User, MessageCircle, Loader2, Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { Message } from "@/shared/schema";
import { motion, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

export default function MessagesPage() {
  const { toast } = useToast();

  const { data, isLoading, error } = useQuery<Message[]>({
    queryKey: [`${process.env.NEXT_PUBLIC_NETLIFY_URL}/messages`],
  });

  const messagesCount = data?.length ?? 0;

  // contador animado
  const count = useSpring(0, { stiffness: 60, damping: 10 });
  const rounded = useTransform(count, (value) => Math.floor(value));

  if (messagesCount > 0) count.set(messagesCount);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-background via-card/70 to-accent/10">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-3" />
        <p className="text-muted-foreground">Carregando mensagens...</p>
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
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/60 to-accent/10 overflow-hidden">
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

      {/* Conteúdo */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 py-16 space-y-10 animate-fadeIn">
        {/* Cabeçalho */}
        <div className="text-center space-y-4">
          <Heart
            className="w-10 h-10 text-primary mx-auto animate-pulse"
            fill="currentColor"
          />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Mensagens Recebidas
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Palavras que aquecem o coração — enviadas com amor 💌
          </p>

          {/* contador */}
          {messagesCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm text-primary shadow-sm"
            >
              <Heart className="w-4 h-4 text-primary" fill="currentColor" />
              <motion.span>{rounded}</motion.span>
              <span>
                {messagesCount > 1
                  ? "mensagens recebidas"
                  : "mensagem recebida"}
              </span>
            </motion.div>
          )}
        </div>

        {/* Nenhuma mensagem */}
        {(!data || data.length === 0) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="text-center py-16 bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl shadow-md">
              <CardContent>
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="font-serif text-2xl mb-2">
                  Nenhuma mensagem ainda
                </h2>
                <p className="text-muted-foreground max-w-sm mx-auto">
                  Assim que os convidados enviarem seus recados, eles aparecerão
                  aqui ❤️
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Lista de mensagens */}
        <div className="space-y-6">
          {data?.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="border border-primary/20 bg-white/10 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <User className="w-5 h-5" />
                    {msg.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4" /> {msg.email}
                  </p>
                  <p className="text-foreground leading-relaxed whitespace-pre-wrap mt-3 border-t border-white/10 pt-3 italic">
                    “{msg.message}”
                  </p>
                  {msg.createdAt && (
                    <p className="text-xs text-muted-foreground mt-3 text-right">
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
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}
