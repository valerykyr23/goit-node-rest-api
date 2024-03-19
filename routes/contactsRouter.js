import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import autenticate from "../middlewars.js/autenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", autenticate, getAllContacts);

contactsRouter.get("/:id", autenticate, getOneContact);

contactsRouter.delete("/:id", autenticate, deleteContact);

contactsRouter.post("/", autenticate, createContact);

contactsRouter.put("/:id", autenticate, updateContact);

contactsRouter.patch("/:id/favorite", autenticate, updateStatusContact);

export default contactsRouter;