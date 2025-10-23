import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Heart, CheckCircle2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Gift } from "@shared/schema";

export default function GiftDetail() {
  const [, params] = useRoute("/gift/:id");
  const giftId = params?.id;
  const [guestName, setGuestName] = useState("");
  const { toast } = useToast();

  const { data: gift, isLoading } = useQuery<Gift>({
    queryKey: ["/api/gifts", giftId],
    enabled: !!giftId,
  });

  const reserveMutation = useMutation({
    mutationFn: async (name: string) => {
      return await apiRequest("POST", `/api/gifts/${giftId}/reserve`, { guestName: name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/gifts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/gifts", giftId] });
      toast({
        title: "Gift reserved!",
        description: "Thank you for your generosity. The couple will be so grateful!",
      });
      setGuestName("");
    },
    onError: () => {
      toast({
        title: "Reservation failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const handleReserve = () => {
    if (!guestName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to reserve this gift.",
        variant: "destructive",
      });
      return;
    }
    reserveMutation.mutate(guestName);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-foreground mb-2" data-testid="text-not-found">Gift not found</h2>
          <Link href="/gifts" data-testid="link-back-not-found">
            <Button variant="outline" className="mt-4" data-testid="button-back-not-found">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Registry
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <Link href="/gifts" data-testid="link-back-gifts">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Back to Registry
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 animate-fadeIn">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted shadow-xl">
              <img
                src={gift.imageUrl}
                alt={gift.title}
                className="w-full h-full object-cover"
                data-testid="img-gift-detail"
              />
            </div>
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-4">
                <h1 className="font-serif text-4xl text-foreground" data-testid="text-gift-detail-title">
                  {gift.title}
                </h1>
                {gift.reserved && (
                  <Badge variant="default" className="gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Reserved
                  </Badge>
                )}
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {gift.description}
              </p>
            </div>

            {/* Personal Note */}
            <Card className="bg-accent/50 border-accent-border" data-testid="card-personal-note">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-serif flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" fill="currentColor" />
                  A Note from Bruno & Ana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground italic leading-relaxed" data-testid="text-personal-note">
                  {gift.personalNote}
                </p>
              </CardContent>
            </Card>

            {/* Purchase Links */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground" data-testid="text-where-to-buy">Where to Buy</h3>
              <div className="space-y-2">
                {gift.purchaseLinks.map((link, index) => {
                  const linkText = link.includes("amazon") ? "Amazon" :
                                  link.includes("mercadolivre") ? "Mercado Livre" :
                                  link.includes("shopee") ? "Shopee" :
                                  `Store ${index + 1}`;
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      data-testid={`link-purchase-${index}`}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full justify-between gap-2"
                        data-testid={`button-purchase-${index}`}
                      >
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4" />
                          <span>Buy from {linkText}</span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Reservation Section */}
            {!gift.reserved ? (
              <Card className="border-primary/20" data-testid="card-reserve-form">
                <CardHeader>
                  <CardTitle className="text-lg font-serif">Reserve This Gift</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="guestName">Your Name</Label>
                    <Input
                      id="guestName"
                      placeholder="Enter your name"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      disabled={reserveMutation.isPending}
                      data-testid="input-guest-name"
                    />
                  </div>
                  <Button
                    onClick={handleReserve}
                    disabled={reserveMutation.isPending}
                    className="w-full gap-2"
                    data-testid="button-reserve"
                  >
                    <Heart className="w-4 h-4" />
                    {reserveMutation.isPending ? "Reserving..." : "Reserve This Gift"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Reserving helps avoid duplicate gifts and lets the couple know you're thinking of them
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-muted border-muted-foreground/20" data-testid="card-reserved-status">
                <CardContent className="pt-6 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-3" />
                  <h3 className="font-medium text-foreground mb-2" data-testid="text-reserved-title">This gift has been reserved</h3>
                  <p className="text-sm text-muted-foreground" data-testid="text-reserved-by">
                    {gift.reservedBy ? `Reserved by ${gift.reservedBy}` : "This gift is no longer available"}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
