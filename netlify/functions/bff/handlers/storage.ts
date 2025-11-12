import { db } from "../../db";
import { gifts, messages, reservations } from "@/shared/schema";
import { randomUUID } from "node:crypto";
import type { Gift, InsertGift, InsertMessage } from "@/shared/schema";
import { eq } from "drizzle-orm";
import { HandlerEvent, HandlerResponse } from "@netlify/functions";
import { errorResponse, jsonResponse } from "@/utils";

export interface IStorage {
  getAllGifts(): Promise<HandlerResponse>;
  getGift(event: HandlerEvent): Promise<HandlerResponse>;
  createGift(event: HandlerEvent): Promise<HandlerResponse>;
  updateGift(id: string, gift: Partial<Gift>): Promise<Gift | undefined>;

  createMessage(event: HandlerEvent): Promise<HandlerResponse>;
  getAllMessages(): Promise<HandlerResponse>;

  editGift(event: HandlerEventWithParams): Promise<HandlerResponse>;

  reserveGift(event: HandlerEventWithParams): Promise<HandlerResponse>;

  deleteGift(event: HandlerEventWithParams): Promise<HandlerResponse>;
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
    if (!giftId) {
      return errorResponse(400, `Invalid gift ID: ${giftId}`);
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
      await db.transaction(async (tx) => {
        await tx.insert(gifts).values({ ...insertGift, id });
      });
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

  async editGift(event: HandlerEventWithParams): Promise<HandlerResponse> {
    if (!event.body) {
      return errorResponse(400, "No data provided");
    }
    const data: Partial<Gift> = JSON.parse(event.body);
    const giftId = event.pathParameters?.id;

    if (!giftId) {
      return errorResponse(400, "Gift ID not provided");
    }

    try {
      const updatedGift = await this.updateGift(giftId, data);

      return jsonResponse(201, updatedGift);
    } catch (error) {
      console.error("Error updating gift:", error);
      return errorResponse(500, "Failed to update gift");
    }
  }

  async updateGift(
    id: string,
    updates: Partial<Gift>
  ): Promise<Gift | undefined> {
    try {
      return await db.transaction(async (tx) => {
        await tx.update(gifts).set(updates).where(eq(gifts.id, id));
        const updatedGift = await tx
          .select()
          .from(gifts)
          .where(eq(gifts.id, id))
          .then((rows) => rows[0]);
        return updatedGift;
      });
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
      await db.transaction(async (tx) => {
        await tx.insert(messages).values({ ...insertMessage, id, createdAt });
      });
      return jsonResponse(201, { id, ...insertMessage, createdAt });
    } catch (error) {
      console.error("Error creating message:", error);
      return errorResponse(500, "Failed to create message");
    }
  }

  async getAllMessages(): Promise<HandlerResponse> {
    try {
      const messagesResponse = await db.select().from(messages);

      return jsonResponse(200, messagesResponse);
    } catch (error) {
      console.error("Error fetching messages:", error);
      return errorResponse(500, "Failed to fetch messages");
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
      return await db.transaction(async (tx) => {
        const gift = await tx
          .select()
          .from(gifts)
          .where(eq(gifts.id, giftId))
          .then((rows) => rows[0]);
        if (!gift) throw new Error("Gift not found");
        if (gift.reserved) throw new Error("Gift already reserved");

        const id = randomUUID();
        const createdAt = new Date();

        await tx
          .insert(reservations)
          .values({ id, giftId, guestName, createdAt });
        await tx
          .update(gifts)
          .set({ reserved: true, reservedBy: guestName })
          .where(eq(gifts.id, giftId));

        return jsonResponse(201, { id, giftId, guestName, createdAt });
      });
    } catch (error) {
      console.error("Error reserving gift:", error);
      return errorResponse(500, "Failed to reserve gift");
    }
  }

  async deleteGift(event: HandlerEventWithParams): Promise<HandlerResponse> {
    const giftId = event.pathParameters?.id;

    if (!giftId) {
      return errorResponse(400, "Gift ID not provided");
    }

    try {
      return await db.transaction(async (tx) => {
        const existingGift = await tx
          .select()
          .from(gifts)
          .where(eq(gifts.id, giftId))
          .then((rows) => rows[0]);

        if (!existingGift) {
          return errorResponse(404, "Gift not found");
        }

        await tx.delete(reservations).where(eq(reservations.giftId, giftId));
        await tx.delete(gifts).where(eq(gifts.id, giftId));

        return jsonResponse(200, { message: "Gift deleted successfully" });
      });
    } catch (error) {
      console.error("Error deleting gift:", error);
      return errorResponse(500, "Failed to delete gift");
    }
  }
}

export const storage = new DrizzleStorage();
