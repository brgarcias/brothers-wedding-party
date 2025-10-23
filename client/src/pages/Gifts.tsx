import { useQuery } from "@tanstack/react-query";
import { GiftCard } from "@/components/GiftCard";
import { Button } from "@/components/ui/button";
import { Gift as GiftIcon, Home } from "lucide-react";
import { Link } from "wouter";
import type { Gift } from "@shared/schema";

export default function Gifts() {
  const { data: gifts, isLoading } = useQuery<Gift[]>({
    queryKey: ["/api/gifts"],
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" data-testid="link-home">
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-home">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>
          <h1 className="font-serif text-2xl md:text-3xl text-foreground">Gift Registry</h1>
          <div className="w-20" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <GiftIcon className="w-12 h-12 text-primary mx-auto mb-4" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-4" data-testid="text-registry-title">
            Choose a Gift for Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="text-registry-description">
            Your generosity means the world to us. Each gift helps us start our new life together. 
            Click on any item to see details and purchase options.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        ) : gifts && gifts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {gifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <GiftIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-foreground mb-2">No gifts yet</h3>
            <p className="text-muted-foreground">
              The gift registry will be available soon.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
