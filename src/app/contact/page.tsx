"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
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
    mutationFn: async (data: InsertMessage) => {
      return await apiRequest(
        "POST",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/messages/create`,
        data
      );
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Mensagem enviada!",
        description:
          "Obrigado pelas suas lindas palavras! Nós vamos guardá-las com muito carinho!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Falha ao enviar a mensagem.",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertMessage) => {
    sendMessageMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/20">
      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-12 space-y-12">
        {/* Header text */}
        <div className="text-center animate-fadeIn space-y-4">
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-2"
            fill="currentColor"
          />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-2">
            Envie seus votos
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Compartilhe mensagens do coração, felicitações ou qualquer dúvida
            que você tenha para nós.
          </p>
        </div>

        {/* Form or Success */}
        {submitted ? (
          <Card className="border-2 border-primary/20 shadow-xl animate-fadeIn">
            <CardContent className="pt-12 pb-12 text-center space-y-6">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto" />
              <h2 className="font-serif text-3xl text-foreground">Obrigado!</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Sua mensagem foi enviada. Nós a leremos com alegria e gratidão.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  className="w-full md:w-auto"
                >
                  Enviar Outra Mensagem
                </Button>
                <Link href="/">
                  <Button className="w-full md:w-auto">
                    Voltar para o Início
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-primary/20 shadow-xl animate-fadeIn">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">
                Formulário de Contato
              </CardTitle>
              <CardDescription>
                Preencha o formulário abaixo para enviar sua mensagem
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
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
                            className="focus:ring-primary focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                            className="focus:ring-primary focus:border-primary"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mensagem</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Compartilhe suas mensagens calorosas, memórias ou recados com nós..."
                            className="min-h-32 resize-none focus:ring-primary focus:border-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2 flex justify-center items-center"
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
