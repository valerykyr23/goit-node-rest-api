
import Contact from "../models/contact.js";
import { createContactSchema, updateContactSchema } from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {

  try {
  const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);

    if (!contact) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(contact);
    
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {

const { id } = req.params;

  try {
    
    const removedContact = await Contact.findByIdAndDelete(id);
    if (!removedContact) {
      throw HttpError(404, "Not Found");
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {

  const newContact = {
      name: req.body,
      email: req.body,
      phone: req.body
    }
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const newPhoneContact = await Contact.create(newContact);
    res.status(201).json(newPhoneContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
    const { id } = req.params;
  const newContact = {
    name: req.body,
    email: req.body,
    phone: req.body
  };

  try {
  
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

     if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body is empty");
    }
   

    const updatedContact = await Contact.findByIdAndUpdate(id, newContact, {new: true});
    if (!updatedContact) {
      throw HttpError(404, "Not Found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = (req, res) => { };