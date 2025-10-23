import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FloatingPetals } from "@/components/FloatingPetals";
import { CountdownTimer } from "@/components/CountdownTimer";
import { PixDonation } from "@/components/PixDonation";
import { Heart, Gift, Mail } from "lucide-react";
import heroImage from "@assets/generated_images/Romantic_wedding_couple_hero_image_bd6453e6.png";

export default function Home() {
  const weddingDate = new Date("2025-12-20T15:00:00");

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Bruno and Ana"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
        </div>

        {/* Floating Petals */}
        <FloatingPetals />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="animate-fadeIn">
            <h1 className="font-cursive text-5xl md:text-7xl text-white mb-6 drop-shadow-lg" data-testid="text-slogan">
              Forever starts here
            </h1>
            <div className="font-serif text-6xl md:text-8xl text-white mb-4 font-light" data-testid="text-couple-names">
              Bruno <span className="text-primary">&</span> Ana
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 font-light" data-testid="text-wedding-date">
              December 20, 2025
            </p>
          </div>

          <div className="mt-12 max-w-lg mx-auto">
            <CountdownTimer targetDate={weddingDate} />
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <Link href="/gifts" data-testid="link-gifts">
              <Button 
                size="lg" 
                className="bg-white/95 text-foreground hover:bg-white gap-2 backdrop-blur-sm"
                data-testid="button-view-registry"
              >
                <Gift className="w-5 h-5" />
                View Gift Registry
              </Button>
            </Link>
            <Link href="/contact" data-testid="link-contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm gap-2"
                data-testid="button-send-wishes"
              >
                <Mail className="w-5 h-5" />
                Send Your Wishes
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Love Story Section */}
      <section className="py-24 px-4 bg-card">
        <div className="max-w-3xl mx-auto text-center animate-fadeIn">
          <Heart className="w-12 h-12 text-primary mx-auto mb-6" fill="currentColor" />
          <h2 className="font-serif text-4xl md:text-5xl text-foreground mb-8" data-testid="text-story-title">
            Our Love Story
          </h2>
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed mb-6" data-testid="text-story-paragraph-1">
              Bruno and Ana's story began by chance — a smile, a conversation, and an instant connection. 
              Over time, that connection grew into something deeper: love, laughter, and endless memories.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-story-paragraph-2">
              Now, they're ready to celebrate their union with family and friends who have been part of their journey. 
              Join us as we begin this beautiful new chapter together.
            </p>
          </div>
        </div>
      </section>

      {/* Pix Donation Section */}
      <PixDonation />

      {/* Footer */}
      <footer className="bg-background border-t py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-serif text-4xl text-primary mb-2">B & A</div>
          <p className="text-sm text-muted-foreground mb-4">December 20, 2025</p>
          <p className="text-xs text-muted-foreground">
            Made with love for our special day
          </p>
        </div>
      </footer>
    </div>
  );
}
