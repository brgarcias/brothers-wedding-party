"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Gift as GiftIcon,
  CheckCircle2,
  PlusCircle,
  Loader2,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";

export default function GiftCreate() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [purchaseLinks, setPurchaseLinks] = useState<string[]>([""]);

  const createGiftMutation = useMutation({
    mutationFn: async () =>
      apiRequest(
        "POST",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/create`,
        {
          title,
          description,
          imageUrl,
          personalNote,
          purchaseLinks: purchaseLinks.filter((link) => link.trim() !== ""),
          reserved: false,
          reservedBy: null,
        }
      ),
    onSuccess: () => {
      toast({
        title: "Presente criado com sucesso 💝",
        description: "O presente foi adicionado à lista!",
      });
      setTitle("");
      setDescription("");
      setImageUrl("");
      setPersonalNote("");
      setPurchaseLinks([""]);
    },
    onError: () =>
      toast({
        title: "Erro ao criar presente",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      }),
  });

  const handleAddLink = () => setPurchaseLinks([...purchaseLinks, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...purchaseLinks];
    newLinks[index] = value;
    setPurchaseLinks(newLinks);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-background via-card/70 to-accent/10 px-4 py-16 overflow-hidden">
      {/* Flores decorativas */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute -left-20 top-0 opacity-[0.12] md:opacity-[0.18]"
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

      {/* Cabeçalho */}
      <div className="text-center mb-10 animate-fadeIn space-y-4 z-10">
        <GiftIcon
          className="w-12 h-12 text-primary mx-auto"
          fill="currentColor"
        />
        <h1 className="font-serif text-4xl md:text-5xl text-foreground">
          Cadastrar Novo Presente
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Preencha os detalhes do presente e adicione à lista com carinho 💝
        </p>
      </div>

      {/* Formulário */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl z-10"
      >
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif flex items-center gap-2 text-primary">
              <GiftIcon className="w-6 h-6" />
              Informações do Presente
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Descreva o presente e adicione links de compra.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Campo: título */}
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Ex: Jogo de Toalhas de Banho"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-background/70 border-white/20"
              />
            </div>

            {/* Campo: descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Breve descrição do presente"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24 bg-background/70 border-white/20"
              />
            </div>

            {/* Campo: imagem */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-background/70 border-white/20"
              />
            </div>

            {/* Campo: nota pessoal */}
            <div className="space-y-2">
              <Label htmlFor="personalNote">Mensagem Pessoal</Label>
              <Textarea
                id="personalNote"
                placeholder="Mensagem que aparecerá junto ao presente"
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="min-h-20 bg-background/70 border-white/20"
              />
            </div>

            {/* Campo: links */}
            <div className="space-y-2">
              <Label>Links de Compra</Label>
              {purchaseLinks.map((link, index) => (
                <Input
                  key={`${link}-${index}`}
                  placeholder={`https://link${index + 1}.com`}
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className="bg-background/70 border-white/20"
                />
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2 w-full sm:w-auto gap-2"
                onClick={handleAddLink}
              >
                <PlusCircle className="w-4 h-4" />
                Adicionar outro link
              </Button>
            </div>

            {/* Botão de envio */}
            <Button
              onClick={() => createGiftMutation.mutate()}
              disabled={createGiftMutation.isPending}
              className="w-full mt-6 gap-2 bg-primary text-white hover:bg-primary/90 transition"
            >
              {createGiftMutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Salvar Presente
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rodapé */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-sm text-muted-foreground text-center"
      >
        <Heart
          className="w-4 h-4 inline text-primary animate-pulse mr-1"
          fill="currentColor"
        />
        Cada presente é um gesto de amor — obrigado por contribuir com esse
        momento especial!
      </motion.div>
    </div>
  );
}
