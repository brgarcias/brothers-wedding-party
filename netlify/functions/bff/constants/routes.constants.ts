import { RouteTable } from "../types/routes.types";
import { storage } from "../handlers/storage";

export const ROUTES: RouteTable = {
  "/gifts": {
    GET: () => storage.getAllGifts(),
  },
  "/gifts/create": {
    POST: (event) => storage.createGift(event),
  },
  "/gifts/:id": {
    GET: (event) => storage.getGift(event),
  },
  "/gifts/:id/edit": {
    PUT: (event) => storage.editGift(event),
  },
  "/gifts/:id/delete": {
    DELETE: (event) => storage.deleteGift(event),
  },
  "/gifts/:id/reserve": {
    POST: (event) => storage.reserveGift(event),
  },
  "/messages/create": {
    POST: (event) => storage.createMessage(event),
  },
  "/messages": {
    GET: () => storage.getAllMessages(),
  },
};
