import { randomUUID } from "crypto";
import type { Gift, InsertGift, Message, InsertMessage, Reservation, InsertReservation } from "@shared/schema";

// Image URLs for seeded gifts
const dinnerwareImage = "/attached_assets/generated_images/White_dinnerware_gift_product_photo_18a5e916.png";
const beddingImage = "/attached_assets/generated_images/Luxury_bedding_gift_product_photo_c2343277.png";
const faucetImage = "/attached_assets/generated_images/Kitchen_faucet_gift_product_photo_aeb6c03a.png";
const cookwareImage = "/attached_assets/generated_images/Cookware_set_gift_product_photo_4a616f61.png";
const glassesImage = "/attached_assets/generated_images/Crystal_glasses_gift_product_photo_b42e2c9f.png";

export interface IStorage {
  // Gifts
  getAllGifts(): Promise<Gift[]>;
  getGift(id: string): Promise<Gift | undefined>;
  createGift(gift: InsertGift): Promise<Gift>;
  updateGift(id: string, gift: Partial<Gift>): Promise<Gift | undefined>;
  
  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  
  // Reservations
  reserveGift(giftId: string, guestName: string): Promise<Reservation>;
}

export class MemStorage implements IStorage {
  private gifts: Map<string, Gift>;
  private messages: Map<string, Message>;
  private reservations: Map<string, Reservation>;

  constructor() {
    this.gifts = new Map();
    this.messages = new Map();
    this.reservations = new Map();
    
    // Seed with initial gifts
    this.seedGifts();
  }

  private seedGifts() {
    const initialGifts: Omit<Gift, "id">[] = [
      {
        title: "Premium Dinnerware Set",
        description: "Elegant 24-piece porcelain dinnerware set perfect for hosting dinner parties and special occasions.",
        imageUrl: dinnerwareImage,
        personalNote: "We dream of hosting beautiful dinners with family and friends in our new home. This set would help us create countless memories around the table.",
        purchaseLinks: [
          "https://www.amazon.com/dinnerware-set",
          "https://www.mercadolivre.com.br/dinnerware",
        ],
        reserved: false,
        reservedBy: null,
      },
      {
        title: "Luxury Bedding Set",
        description: "Egyptian cotton 600-thread-count bed sheet set with duvet cover in ivory. Queen size.",
        imageUrl: beddingImage,
        personalNote: "After a long day, nothing feels better than sinking into luxurious, soft sheets. We'd love to end each day wrapped in comfort together.",
        purchaseLinks: [
          "https://www.amazon.com/luxury-bedding",
          "https://www.shopee.com.br/bedding-set",
        ],
        reserved: false,
        reservedBy: null,
      },
      {
        title: "Modern Kitchen Faucet",
        description: "Contemporary pull-down kitchen faucet with dual spray modes in brushed nickel finish.",
        imageUrl: faucetImage,
        personalNote: "The kitchen is the heart of our home. This beautiful faucet would make our daily cooking adventures even more enjoyable.",
        purchaseLinks: [
          "https://www.amazon.com/kitchen-faucet",
          "https://www.mercadolivre.com.br/faucet",
        ],
        reserved: false,
        reservedBy: null,
      },
      {
        title: "Professional Cookware Set",
        description: "10-piece stainless steel cookware set with copper core for even heat distribution.",
        imageUrl: cookwareImage,
        personalNote: "We love cooking together, and professional-quality pots and pans would help us create delicious meals for years to come.",
        purchaseLinks: [
          "https://www.amazon.com/cookware-set",
          "https://www.shopee.com.br/cookware",
        ],
        reserved: false,
        reservedBy: null,
      },
      {
        title: "Crystal Wine Glasses",
        description: "Set of 8 hand-blown crystal wine glasses, perfect for celebrating special moments.",
        imageUrl: glassesImage,
        personalNote: "Every celebration deserves beautiful glasses. These would be perfect for toasting to life's precious moments together.",
        purchaseLinks: [
          "https://www.amazon.com/wine-glasses",
          "https://www.mercadolivre.com.br/glasses",
        ],
        reserved: false,
        reservedBy: null,
      },
      {
        title: "Stand Mixer",
        description: "Professional 5-quart stand mixer with multiple attachments for baking and cooking.",
        imageUrl: cookwareImage,
        personalNote: "We both have a sweet tooth! This mixer would help us bake cakes, cookies, and bread to share with loved ones.",
        purchaseLinks: [
          "https://www.amazon.com/stand-mixer",
          "https://www.shopee.com.br/mixer",
        ],
        reserved: false,
        reservedBy: null,
      },
    ];

    initialGifts.forEach((gift) => {
      const id = randomUUID();
      this.gifts.set(id, { ...gift, id });
    });
  }

  // Gifts
  async getAllGifts(): Promise<Gift[]> {
    return Array.from(this.gifts.values());
  }

  async getGift(id: string): Promise<Gift | undefined> {
    return this.gifts.get(id);
  }

  async createGift(insertGift: InsertGift): Promise<Gift> {
    const id = randomUUID();
    const gift: Gift = { 
      ...insertGift, 
      id,
      reserved: insertGift.reserved ?? false,
      reservedBy: insertGift.reservedBy ?? null,
    };
    this.gifts.set(id, gift);
    return gift;
  }

  async updateGift(id: string, updates: Partial<Gift>): Promise<Gift | undefined> {
    const gift = this.gifts.get(id);
    if (!gift) return undefined;
    
    const updatedGift = { ...gift, ...updates };
    this.gifts.set(id, updatedGift);
    return updatedGift;
  }

  // Messages
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = randomUUID();
    const message: Message = {
      ...insertMessage,
      id,
      createdAt: new Date(),
    };
    this.messages.set(id, message);
    return message;
  }

  // Reservations
  async reserveGift(giftId: string, guestName: string): Promise<Reservation> {
    const gift = this.gifts.get(giftId);
    if (!gift) {
      throw new Error("Gift not found");
    }
    if (gift.reserved) {
      throw new Error("Gift already reserved");
    }

    const id = randomUUID();
    const reservation: Reservation = {
      id,
      giftId,
      guestName,
      createdAt: new Date(),
    };
    this.reservations.set(id, reservation);

    // Update gift
    await this.updateGift(giftId, {
      reserved: true,
      reservedBy: guestName,
    });

    return reservation;
  }
}

export const storage = new MemStorage();
