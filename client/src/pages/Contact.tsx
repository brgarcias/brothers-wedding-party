import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
      return await apiRequest("POST", "/api/messages", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      toast({
        title: "Message sent!",
        description: "Thank you for your beautiful words. Bruno and Ana will cherish them!",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Failed to send",
        description: "Please try again later.",
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
            <Button variant="ghost" size="sm" className="gap-2" data-testid="button-home">
              <ArrowLeft className="w-4 h-4" />
              Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center mb-12 animate-fadeIn">
          <Heart className="w-12 h-12 text-primary mx-auto mb-4" fill="currentColor" />
          <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4" data-testid="text-contact-title">
            Send Your Wishes
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto" data-testid="text-contact-description">
            Share your heartfelt messages, greetings, or any questions you may have for Bruno and Ana
          </p>
        </div>

        {submitted ? (
          <Card className="border-2 border-primary/20 shadow-xl animate-fadeIn" data-testid="card-success">
            <CardContent className="pt-12 pb-12 text-center">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="font-serif text-3xl text-foreground mb-4" data-testid="text-success-title">
                Thank You!
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto" data-testid="text-success-message">
                Your message has been sent. Bruno and Ana will read it with joy and gratitude.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  data-testid="button-send-another"
                >
                  Send Another Message
                </Button>
                <Link href="/" data-testid="link-back-home">
                  <Button data-testid="button-back-home">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-primary/20 shadow-xl animate-fadeIn">
            <CardHeader>
              <CardTitle className="font-serif text-2xl">Contact Form</CardTitle>
              <CardDescription>
                Fill in the form below to send your message
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your name" 
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your.email@example.com" 
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
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share your warm wishes, memories, or messages for the couple..."
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
                    {sendMessageMutation.isPending ? "Sending..." : "Send with Love"}
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
