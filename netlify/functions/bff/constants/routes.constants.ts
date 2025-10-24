import { RouteTable } from "../types/routes.types";
import { storage } from "../handlers/storage";

export const ROUTES: RouteTable = {
  "/gifts": {
    GET: storage.getAllGifts,
  },
  "/gifts/create": {
    POST: storage.createGift,
  },
  "/gifts/:id": {
    GET: storage.getGift,
  },
  "/gifts/:id/reserve": {
    POST: storage.reserveGift,
  },
  "/messages/create": {
    POST: storage.createMessage,
  },
  "/messages": {
    GET: storage.getAllMessages,
  },
};
