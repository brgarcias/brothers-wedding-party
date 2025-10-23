import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, insertReservationSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all gifts
  app.get("/api/gifts", async (req, res) => {
    try {
      const gifts = await storage.getAllGifts();
      res.json(gifts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gifts" });
    }
  });

  // Get single gift
  app.get("/api/gifts/:id", async (req, res) => {
    try {
      const gift = await storage.getGift(req.params.id);
      if (!gift) {
        return res.status(404).json({ error: "Gift not found" });
      }
      res.json(gift);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gift" });
    }
  });

  // Reserve a gift
  app.post("/api/gifts/:id/reserve", async (req, res) => {
    try {
      const reservationData = insertReservationSchema.parse({
        giftId: req.params.id,
        guestName: req.body.guestName,
      });

      const reservation = await storage.reserveGift(
        reservationData.giftId,
        reservationData.guestName
      );
      
      res.json(reservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      if (error instanceof Error) {
        if (error.message === "Gift not found") {
          return res.status(404).json({ error: error.message });
        }
        if (error.message === "Gift already reserved") {
          return res.status(409).json({ error: error.message });
        }
      }
      res.status(500).json({ error: "Failed to reserve gift" });
    }
  });

  // Submit contact message
  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid request data", details: error.errors });
      }
      res.status(500).json({ error: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
