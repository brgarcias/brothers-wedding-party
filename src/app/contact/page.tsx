"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMessageSchema, type InsertMessage } from "@/shared/schema";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (data: InsertMessage) =>
      apiRequest(
        "POST",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/messages/create`,
        data
      ),
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Mensagem enviada com amor 💌",
        description:
          "Obrigado pelas suas palavras! Elas significam muito para nós.",
      });
      form.reset();
    },
    onError: () =>
      toast({
        title: "Falha ao enviar mensagem",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      }),
  });

  const onSubmit = (data: InsertMessage) => sendMessageMutation.mutate(data);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/70 to-accent/10 overflow-hidden">
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

      {/* Conteúdo principal */}
      <main className="relative z-10 max-w-2xl mx-auto px-6 py-20 space-y-12 animate-fadeIn">
        {/* Cabeçalho */}
        <div className="text-center space-y-4">
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-2 animate-pulse"
            fill="currentColor"
          />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground">
            Envie seus votos
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto text-base leading-relaxed">
            Compartilhe mensagens do coração, felicitações ou recordações
            especiais conosco.
          </p>
        </div>

        {/* Sucesso ou formulário */}
        {submitted ? (
          <Card className="bg-white/10 backdrop-blur-sm border-primary/30 rounded-2xl shadow-lg animate-fadeIn">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h2 className="font-serif text-3xl text-foreground">Obrigado!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Sua mensagem foi enviada com sucesso. Ela ficará guardada com
                muito carinho 💕
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Enviar Outra Mensagem
                </Button>
                <Link href="/">
                  <Button className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
                    Voltar para o Início
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 rounded-2xl shadow-lg animate-fadeIn">
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl text-primary">
                Formulário de Contato
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Preencha o formulário abaixo com amor 💌
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Nome */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Seu nome"
                            {...field}
                            className="bg-background/80 border-white/20 focus:ring-primary focus:border-primary rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>E-mail</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="seu.email@exemplo.com"
                            {...field}
                            className="bg-background/80 border-white/20 focus:ring-primary focus:border-primary rounded-xl"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Mensagem */}
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Deixe aqui seus votos, memórias ou recados..."
                            className="min-h-32 resize-none bg-background/80 border-white/20 focus:ring-primary focus:border-primary rounded-xl"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Botão */}
                  <Button
                    type="submit"
                    className="w-full gap-2 flex justify-center items-center bg-primary text-white hover:bg-primary/90 rounded-full transition-all duration-300"
                    disabled={sendMessageMutation.isPending}
                  >
                    {sendMessageMutation.isPending
                      ? "Enviando..."
                      : "Enviar com Amor"}
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}
