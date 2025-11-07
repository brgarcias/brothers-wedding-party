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
import { Gift as GiftIcon, CheckCircle2 } from "lucide-react";

export default function GiftCreate() {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [purchaseLinks, setPurchaseLinks] = useState<string[]>([""]);

  const createGiftMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(
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
      );
    },
    onSuccess: () => {
      toast({
        title: "Presente criado!",
        description: "O presente foi adicionado à lista com sucesso.",
      });
      // reset form
      setTitle("");
      setDescription("");
      setImageUrl("");
      setPersonalNote("");
      setPurchaseLinks([""]);
    },
    onError: (e) => {
      console.info(e);
      toast({
        title: "Erro",
        description: "Não foi possível criar o presente. Tente novamente.",
        variant: "destructive",
      });
    },
  });

  const handleAddLink = () => setPurchaseLinks([...purchaseLinks, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...purchaseLinks];
    newLinks[index] = value;
    setPurchaseLinks(newLinks);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-serif flex items-center gap-2">
              <GiftIcon className="w-6 h-6 text-primary" />
              Cadastrar Novo Presente
            </CardTitle>
            <CardDescription>
              Preencha os dados do presente e clique em salvar.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                placeholder="Nome do presente"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descrição do presente"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-24"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL da Imagem</Label>
              <Input
                id="imageUrl"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="personalNote">Mensagem Pessoal</Label>
              <Textarea
                id="personalNote"
                placeholder="Mensagem para quem for ver o presente"
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className="min-h-20"
              />
            </div>

            <div className="space-y-2">
              <Label>Links de Compra</Label>
              {purchaseLinks.map((link, index) => (
                <Input
                  key={link}
                  placeholder="https://..."
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                />
              ))}
              <Button
                type="button"
                variant="outline"
                className="mt-2"
                onClick={handleAddLink}
              >
                Adicionar mais um link
              </Button>
            </div>

            <Button
              onClick={() => createGiftMutation.mutate()}
              className="w-full gap-2 mt-4"
            >
              <CheckCircle2 className="w-5 h-5" />
              Salvar Presente
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
