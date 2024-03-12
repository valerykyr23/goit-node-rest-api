import Contact from "../models/contact.js";
import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res, next) => {
  const { _id: owner } = req.user;

  try {
    const contacts = await Contact.find({ owner });
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

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
    const removedContact = await Contact.findOneAndDelete({
      _id: id,
      owner: req.user.id,
    });
    if (!removedContact) {
      throw HttpError(404, "Not Found");
    }
    res.json(removedContact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    const { name, email, phone } = req.body;
    const { _id: owner } = req.user;
    if (error) {
      throw HttpError(400, error.message);
    }

    const newPhoneContact = await Contact.create({ name, email, phone, owner });

    res.status(201).json(newPhoneContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "Body is empty");
    }

    const { id } = req.params;
    const { _id: owner } = req.user;

    const updatedContact = await Contact.findOneAndUpdate(
      { _id: id, owner },
      req.body,
      { new: true }
    );
    if (!updatedContact) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = updateStatusContactSchema.validate(req.body);
    if (error) {
      throw HttpError(404, "Not Found");
    }
    const { id } = req.params;
    const { _id: owner } = req.user;
    const { favorite } = req.body;
    const updatedStatus = await Contact.findOneAndUpdate(
      {
        _id: id,
        owner,
      },
      { favorite },
      {
        new: true,
      }
    );
    if (!updatedStatus) {
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedStatus);
  } catch (error) {
    next(error);
  }
};
