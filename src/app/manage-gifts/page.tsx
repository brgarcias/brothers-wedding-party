"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import Image from "next/image";
import leftFlower from "@images/flower-left.svg";
import rightFlower from "@images/flower-right.svg";
import { FloatingPetals } from "@/components/FloatingPetals";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Loader2,
  Pencil,
  PlusCircle,
  Trash2,
  Gift as GiftIcon,
  Link as LinkIcon,
  Search,
  MessageCircleHeartIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Gift } from "@/shared/schema";

export default function GiftsAdminPage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<"all" | "available" | "reserved">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [giftToDelete, setGiftToDelete] = useState<Gift | null>(null);
  const { toast } = useToast();

  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["gifts"],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts`);
      if (!res.ok) throw new Error("Erro ao carregar presentes");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (giftId: string) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_NETLIFY_URL}/gifts/${giftId}/delete`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("Erro ao excluir presente");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gifts"] });
      setGiftToDelete(null);
      toast({
        title: "Presente excluído com sucesso!",
        description: "As alterações foram salvas.",
      });
    },
    onError: () => {
      toast({
        title: "Erro ao deletar presente",
        description: "Por favor, tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const filteredGifts = useMemo(() => {
    if (!gifts) return [];
    return gifts
      .filter((g) => {
        if (filter === "available") return !g.reserved;
        if (filter === "reserved") return g.reserved;
        return true;
      })
      .filter((g) =>
        [g.title, g.description]
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
  }, [gifts, filter, searchTerm]);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-card/80 to-accent/10 overflow-hidden">
      {/* Fundo floral e pétalas */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-0 md:-left-36 opacity-[0.15] md:opacity-[0.2]">
          <Image src={leftFlower} alt="Flor esquerda" draggable="false" />
        </div>
        <div className="absolute -right-20 bottom-0 md:-right-32 opacity-[0.12] md:opacity-[0.18]">
          <Image src={rightFlower} alt="Flor direita" draggable="false" />
        </div>
      </div>
      <FloatingPetals />

      {/* Conteúdo principal */}
      <main className="relative max-w-7xl mx-auto px-6 py-20 animate-fadeIn">
        {/* Cabeçalho */}
        <div className="text-center mb-16">
          <GiftIcon className="w-12 h-12 text-primary mx-auto mb-4 animate-pulse" />
          <h1 className="font-serif text-4xl md:text-5xl text-primary mb-3 tracking-wide">
            Administração de Presentes
          </h1>
          <p className="text-muted-foreground/90 max-w-2xl mx-auto text-lg leading-relaxed font-light">
            Gerencie com carinho os presentes que farão parte deste momento
            especial 💝
          </p>
          <div className="w-24 h-[1px] bg-primary/30 rounded-full mx-auto mt-8" />
        </div>

        {/* Filtros e busca */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {(["all", "available", "reserved"] as const).map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              className={`rounded-full transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "border-primary/30 text-primary hover:bg-primary/10"
              }`}
              onClick={() => setFilter(f)}
            >
              {f === "all"
                ? "Todos"
                : f === "available"
                ? "Disponíveis"
                : "Reservados"}
            </Button>
          ))}

          <Button
            className="ml-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            onClick={() => router.push("/create-gift")}
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Novo Presente
          </Button>

          <Button
            onClick={() => router.push("/messages")}
            className="group ml-2 rounded-full bg-gradient-to-r from-primary to-pink-500 text-white px-6 shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
          >
            <div className="flex items-center gap-2">
              <MessageCircleHeartIcon className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              <span className="font-medium">Ver Votos</span>
            </div>
          </Button>
        </div>

        {/* Campo de busca */}
        <div className="flex justify-center mb-12 relative max-w-md mx-auto">
          <Search
            className="absolute left-3 top-3 text-muted-foreground"
            size={18}
          />
          <Input
            type="text"
            placeholder="Pesquisar presente..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full shadow-sm border-primary/20 focus-visible:ring-primary/50"
          />
        </div>

        {/* Lista */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-muted rounded-lg animate-pulse"
              />
            ))}
          </div>
        ) : filteredGifts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
            {filteredGifts.map((gift) => (
              <Card
                key={gift.id}
                className="overflow-hidden shadow-sm hover:shadow-md border border-primary/10 bg-white/80 backdrop-blur-sm transition-all duration-300"
              >
                <CardHeader className="p-0">
                  <img
                    src={gift.imageUrl}
                    alt={gift.title}
                    className="w-full h-56 object-cover"
                  />
                </CardHeader>
                <CardContent className="p-5">
                  <h3 className="text-lg font-serif text-foreground mb-2">
                    {gift.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-3">
                    {gift.description}
                  </p>

                  {gift.purchaseLinks?.length > 0 && (
                    <a
                      href={gift.purchaseLinks[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm text-primary hover:underline"
                    >
                      <LinkIcon className="w-4 h-4 mr-1" /> Ver link de compra
                    </a>
                  )}

                  <Badge
                    variant={gift.reserved ? "destructive" : "secondary"}
                    className="ml-4"
                  >
                    {gift.reserved ? "Reservado" : "Disponível"}
                  </Badge>

                  {gift.personalNote && (
                    <p className="mt-3 text-xs italic text-muted-foreground/70">
                      “{gift.personalNote}”
                    </p>
                  )}
                </CardContent>

                <CardFooter className="flex justify-between border-t p-4 bg-card/50 backdrop-blur-sm">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push(`/gifts/${gift.id}/edit`)}
                    className="rounded-full text-sm"
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Editar
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={deleteMutation.isPending}
                    onClick={() => setGiftToDelete(gift)}
                    className="rounded-full text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Excluir
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground animate-fadeIn">
            <GiftIcon className="w-16 h-16 mx-auto mb-4 opacity-40" />
            <h3 className="text-xl font-medium mb-2">
              Nenhum presente encontrado
            </h3>
            <p className="text-sm">Tente ajustar sua busca ou filtros 💝</p>
          </div>
        )}
      </main>

      {/* Modal de confirmação */}
      <Dialog open={!!giftToDelete} onOpenChange={() => setGiftToDelete(null)}>
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
              onClick={() => setGiftToDelete(null)}
            >
              Cancelar
            </Button>
            <Button
              variant="destructive"
              className="rounded-full"
              disabled={deleteMutation.isPending}
              onClick={() =>
                giftToDelete && deleteMutation.mutate(giftToDelete.id)
              }
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
