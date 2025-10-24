import { db } from "../../db";
import { gifts, messages, reservations } from "@shared/schema";
import { randomUUID } from "node:crypto";
import type { Gift, InsertGift, InsertMessage } from "@shared/schema";
import { eq } from "drizzle-orm";
import { HandlerEvent, HandlerResponse } from "@netlify/functions";
import { errorResponse, jsonResponse } from "@/utils";

export interface IStorage {
  getAllGifts(): Promise<HandlerResponse>;
  getGift(event: HandlerEvent): Promise<HandlerResponse>;
  createGift(event: HandlerEvent): Promise<HandlerResponse>;
  updateGift(id: string, gift: Partial<Gift>): Promise<Gift | undefined>;
  createMessage(event: HandlerEvent): Promise<HandlerResponse>;

  reserveGift(event: HandlerEventWithParams): Promise<HandlerResponse>;
}

interface HandlerEventWithParams extends HandlerEvent {
  pathParameters?: {
    id?: string;
  };
}

export class DrizzleStorage implements IStorage {
  async getAllGifts(): Promise<HandlerResponse> {
    try {
      const giftsResponse = await db.select().from(gifts);

      return jsonResponse(200, giftsResponse);
    } catch (error) {
      console.error("Error fetching gifts:", error);
      return errorResponse(500, "Failed to fetch gifts");
    }
  }

  async getGift(event: HandlerEvent): Promise<HandlerResponse> {
    const giftId = event.path.split("/").pop();
    if (!giftId || Number.isNaN(Number.parseInt(giftId))) {
      return errorResponse(400, "Invalid gift ID");
    }

    try {
      const gift = await db
        .select()
        .from(gifts)
        .where(eq(gifts.id, giftId))
        .then((rows) => rows[0]);

      if (!gift) {
        return errorResponse(404, "Gift not found");
      }

      return jsonResponse(200, gift);
    } catch (error) {
      console.error("Error fetching gift by ID:", error);
      return errorResponse(500, "Failed to fetch gift by ID");
    }
  }

  async createGift(event: HandlerEvent): Promise<HandlerResponse> {
    if (!event.body) {
      return errorResponse(400, "No data provided");
    }
    const id = randomUUID();
    const insertGift: InsertGift = JSON.parse(event.body || "{}");
    try {
      await db.insert(gifts).values({ ...insertGift, id });
      return jsonResponse(201, {
        id,
        ...insertGift,
        reserved: insertGift.reserved ?? false,
        reservedBy: insertGift.reservedBy ?? null,
      });
    } catch (error) {
      console.error("Error creating gift:", error);
      return errorResponse(500, "Failed to create gift");
    }
  }

  async updateGift(
    id: string,
    updates: Partial<Gift>
  ): Promise<Gift | undefined> {
    try {
      await db.update(gifts).set(updates).where(eq(gifts.id, id));
      return db
        .select()
        .from(gifts)
        .where(eq(gifts.id, id))
        .then((rows) => rows[0]);
    } catch (error) {
      console.error("Error updating gift:", error);
      return undefined;
    }
  }

  async createMessage(event: HandlerEvent): Promise<HandlerResponse> {
    if (!event.body) {
      return errorResponse(400, "No data provided");
    }
    const id = randomUUID();
    const createdAt = new Date();
    const insertMessage: InsertMessage = JSON.parse(event.body || "{}");
    try {
      await db.insert(messages).values({ ...insertMessage, id, createdAt });
      return jsonResponse(201, { id, ...insertMessage, createdAt });
    } catch (error) {
      console.error("Error creating message:", error);
      return errorResponse(500, "Failed to create message");
    }
  }

  async reserveGift(event: HandlerEventWithParams): Promise<HandlerResponse> {
    if (!event.body) {
      return errorResponse(400, "No data provided");
    }
    const { guestName }: { guestName: string } = JSON.parse(event.body);
    const giftId = event.pathParameters?.id;

    if (!giftId) {
      return errorResponse(400, "Gift ID not provided");
    }

    try {
      const gift = await db
        .select()
        .from(gifts)
        .where(eq(gifts.id, giftId))
        .then((rows) => rows[0]);
      if (!gift) throw new Error("Gift not found");
      if (gift.reserved) throw new Error("Gift already reserved");

      const id = randomUUID();
      const createdAt = new Date();

      await db
        .insert(reservations)
        .values({ id, giftId, guestName, createdAt });
      await this.updateGift(giftId, { reserved: true, reservedBy: guestName });

      return jsonResponse(201, { id, giftId, guestName, createdAt });
    } catch (error) {
      console.error("Error reserving gift:", error);
      return errorResponse(500, "Failed to reserve gift");
    }
  }
}

export const storage = new DrizzleStorage();
