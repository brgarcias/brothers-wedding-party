"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
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
import { motion } from "framer-motion";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Gift } from "@/shared/schema";
import {
  CheckCircle2,
  Loader2,
  PlusCircle,
  Heart,
  Gift as GiftIcon,
  ArrowLeft,
  Trash2,
} from "lucide-react";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function EditGiftPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const giftId = params?.id as string;
  const queryClient = useQueryClient();

  const { data: gift, isLoading } = useQuery<Gift>({
    queryKey: [`gift-${giftId}`],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/${giftId}`
      );
      if (!res.ok) throw new Error("Erro ao carregar presente");
      return res.json();
    },
    enabled: !!giftId,
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [personalNote, setPersonalNote] = useState("");
  const [purchaseLinks, setPurchaseLinks] = useState<string[]>([""]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [giftToDelete, setGiftToDelete] = useState<Gift | undefined>(undefined);

  useEffect(() => {
    if (gift) {
      setTitle(gift.title || "");
      setDescription(gift.description || "");
      setImageUrl(gift.imageUrl || "");
      setPersonalNote(gift.personalNote || "");
      setPurchaseLinks(gift.purchaseLinks?.length ? gift.purchaseLinks : [""]);
    }
  }, [gift]);

  const mutation = useMutation({
    mutationFn: async () =>
      apiRequest(
        "PUT",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/${giftId}/edit`,
        {
          title,
          description,
          imageUrl,
          personalNote,
          purchaseLinks: purchaseLinks.filter((link) => link.trim() !== ""),
        }
      ),
    onSuccess: async () => {
      toast({
        title: "Presente atualizado com sucesso 💝",
        description: "As alterações foram salvas!",
      });
      queryClient.invalidateQueries({ queryKey: [`gift-${giftId}`] });
      await new Promise((r) => setTimeout(r, 600));
      router.push("/manage-gifts");
    },
    onError: () =>
      toast({
        title: "Erro ao atualizar presente",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      }),
  });

  const deleteMutation = useMutation({
    mutationFn: async () =>
      apiRequest(
        "DELETE",
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/${giftId}/delete`
      ),
    onSuccess: async () => {
      toast({
        title: "Presente removido 💔",
        description: "O presente foi excluído com sucesso.",
      });
      setGiftToDelete(undefined);
      await new Promise((r) => setTimeout(r, 600));
      router.push("/manage-gifts");
    },
    onError: () =>
      toast({
        title: "Erro ao excluir presente",
        description: "Tente novamente mais tarde.",
        variant: "destructive",
      }),
  });

  const handleAddLink = () => setPurchaseLinks([...purchaseLinks, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...purchaseLinks];
    newLinks[index] = value;
    setPurchaseLinks(newLinks);
  };

  const validateFields = () => {
    const hasValidLink = purchaseLinks.some((link) => link.trim() !== "");
    const newErrors = {
      title: title.trim() === "",
      description: description.trim() === "",
      imageUrl: imageUrl.trim() === "",
      personalNote: personalNote.trim() === "",
      purchaseLinks: !hasValidLink,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  const handleSubmit = () => {
    if (!validateFields()) {
      toast({
        title: "Campos obrigatórios faltando",
        description:
          "Por favor, preencha todos os campos e adicione pelo menos um link válido.",
        variant: "destructive",
      });
      return;
    }
    mutation.mutate();
  };

  const inputBase =
    "bg-background/70 border-white/20 focus-visible:ring-2 focus-visible:ring-primary transition";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background/50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          Editar Presente
        </h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          Atualize ou remova o presente com carinho 💝
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
          <CardHeader className="flex flex-col gap-3">
            <CardTitle className="text-2xl font-serif flex items-center gap-2 text-primary">
              <GiftIcon className="w-6 h-6" />
              Informações do Presente
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Edite os detalhes ou remova o presente.
            </CardDescription>

            <div className="flex justify-between mt-2">
              <Button
                variant="outline"
                className="gap-2 text-sm"
                onClick={() => router.push("/manage-gifts")}
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>

              <Button
                variant="destructive"
                className="gap-2 text-sm"
                onClick={() => setGiftToDelete(gift)}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Excluir
                  </>
                )}
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                placeholder="Ex: Conjunto de Copos"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`${inputBase} ${
                  errors.title ? "border-destructive" : ""
                }`}
              />
              {errors.title && (
                <p className="text-destructive text-xs">Campo obrigatório</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="description">Descrição *</Label>
              <Textarea
                id="description"
                placeholder="Breve descrição do presente"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`${inputBase} ${
                  errors.description ? "border-destructive" : ""
                } min-h-24`}
              />
              {errors.description && (
                <p className="text-destructive text-xs">Campo obrigatório</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="imageUrl">URL da Imagem *</Label>
              <Input
                id="imageUrl"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className={`${inputBase} ${
                  errors.imageUrl ? "border-destructive" : ""
                }`}
              />
              {imageUrl && (
                <div className="mt-3">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-32 h-32 rounded-md object-cover border border-white/30 shadow-sm"
                  />
                </div>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="personalNote">Mensagem Pessoal *</Label>
              <Textarea
                id="personalNote"
                placeholder="Mensagem que aparecerá junto ao presente"
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                className={`${inputBase} ${
                  errors.personalNote ? "border-destructive" : ""
                } min-h-20`}
              />
              {errors.personalNote && (
                <p className="text-destructive text-xs">Campo obrigatório</p>
              )}
            </div>

            <div className="space-y-1">
              <Label>Links de Compra *</Label>
              {purchaseLinks.map((link, index) => (
                <Input
                  key={index}
                  placeholder={`https://link${index + 1}.com`}
                  value={link}
                  onChange={(e) => handleLinkChange(index, e.target.value)}
                  className={`${inputBase} ${
                    errors.purchaseLinks && index === 0
                      ? "border-destructive"
                      : ""
                  }`}
                />
              ))}
              {errors.purchaseLinks && (
                <p className="text-destructive text-xs">
                  Adicione pelo menos um link válido
                </p>
              )}
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

            <Button
              onClick={handleSubmit}
              disabled={mutation.isPending}
              className="w-full mt-6 gap-2 bg-primary text-white hover:bg-primary/90 transition"
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Salvar Alterações
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>

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
        Atualizar ou excluir um presente também é um gesto de carinho 💖
      </motion.div>

      {/* Modal de confirmação */}
      <Dialog
        open={!!giftToDelete}
        onOpenChange={() => setGiftToDelete(undefined)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl text-primary">
              Confirmar exclusão
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Tem certeza de que deseja excluir{" "}
              <span className="font-semibold text-foreground">
                {giftToDelete?.title}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex justify-end gap-3 pt-4">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setGiftToDelete(undefined)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={deleteMutation.isPending}
              onClick={() => deleteMutation.mutate()}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
              ) : (
                <Trash2 className="w-4 h-4 mr-2" />
              )}
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
