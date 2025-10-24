"use client";

import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <Card className="w-full max-w-md shadow-lg border border-gray-200">
        <CardContent className="pt-8 pb-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Ops! Página Não Encontrada
          </h1>
          <p className="text-gray-600 mb-6">
            Parece que você se perdeu pelo caminho 😅
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
            data-testid="button-home"
          >
            <Home className="w-4 h-4" />
            Voltar para o Início
          </Button>
        </CardContent>
      </Card>

      <p className="mt-6 text-sm text-gray-500 text-center max-w-xs">
        Se você digitou a URL manualmente, verifique se está correta.
      </p>
    </div>
  );
}
