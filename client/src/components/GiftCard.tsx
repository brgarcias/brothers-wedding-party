import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Gift as GiftIcon, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import type { Gift } from "@shared/schema";

interface GiftCardProps {
  gift: Gift;
}

export function GiftCard({ gift }: GiftCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={gift.imageUrl}
            alt={gift.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-gift-${gift.id}`}
          />
          {gift.reserved && (
            <div className="absolute top-3 right-3">
              <Badge variant="default" className="bg-primary/90 backdrop-blur-sm gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Reserved
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="font-serif text-xl font-medium text-foreground mb-2" data-testid={`text-gift-title-${gift.id}`}>
          {gift.title}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {gift.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/gift/${gift.id}`} className="w-full" data-testid={`link-gift-${gift.id}`}>
          <Button 
            variant="outline" 
            className="w-full gap-2"
            data-testid={`button-view-gift-${gift.id}`}
          >
            <GiftIcon className="w-4 h-4" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
