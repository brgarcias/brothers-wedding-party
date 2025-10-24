"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
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
import { ArrowLeft, Heart, Send, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";

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
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/messages`,
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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/" data-testid="link-home">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              data-testid="button-home"
            >
              <ArrowLeft className="w-4 h-4" />
              Início
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <Heart
            className="w-12 h-12 text-primary mx-auto mb-4"
            fill="currentColor"
          />
          <h1
            className="font-serif text-4xl md:text-5xl text-foreground mb-4"
            data-testid="text-contact-title"
          >
            Envie seus votos
          </h1>
          <p
            className="text-muted-foreground max-w-xl mx-auto"
            data-testid="text-contact-description"
          >
            Compartilhe mensagens do coração, felicitações ou qualquer dúvida
            que você tenha para nós
          </p>
        </div>

        {submitted ? (
          <Card
            className="border-2 border-primary/20 shadow-xl animate-fadeIn"
            data-testid="card-success"
          >
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2
                className="font-serif text-3xl text-foreground mb-4"
                data-testid="text-success-title"
              >
                Obrigado!
              </h2>
              <p
                className="text-muted-foreground mb-8 max-w-md mx-auto"
                data-testid="text-success-message"
              >
                Sua mensagem foi enviada. Nós a leremos com alegria e gratidão.
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  data-testid="button-send-another"
                >
                  Enviar Outra Mensagem
                </Button>
                <Link href="/" data-testid="link-back-home">
                  <Button data-testid="button-back-home">
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
                            data-testid="input-name"
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
                            data-testid="input-email"
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
                            className="min-h-32 resize-none"
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gap-2"
                    disabled={sendMessageMutation.isPending}
                    data-testid="button-send"
                  >
                    <Send className="w-4 h-4" />
                    {sendMessageMutation.isPending
                      ? "Enviando..."
                      : "Enviar com Amor"}
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
