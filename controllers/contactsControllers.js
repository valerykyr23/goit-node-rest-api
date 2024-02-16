// import contactsService from "../services/contactsServices.js";
const contactsServices = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");
const {createContactSchema,
    updateContactSchema} = require("../schemas/contactsSchemas")

const getAllContacts = async (req, res, next) => {
    try { 
    const result = await contactsServices.listContacts();
    res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
     }
    
 }; // работает

const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsServices.getContactById(id);
        

        if (!result) {
            throw HttpError(404, "Not Found");
        }
        res.status(200).json(result);
     }
    catch (error) {
       next(error)
    }
 }; // работает

const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await contactsServices.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not Found");
        };
        res.status({ message: "Successfull delete" });
     }
    catch (error) {
        next(error)
    }
 }; // удаляет но уходит в долгую загрузку

const createContact = async (req, res, next) => {
    try { 

        const { error } = createContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message)
        }

        const result = await contactsServices.addContact(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error)
    }
 };// error HttpError is not a function - не работает

const updateContact = async (req, res, next) => {
 try { 

        const { error } = updateContactSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message)
        }
     const { id } = req.params;
     const result = await contactsServices.updateById(id, req.body);
      if (!result) {
            throw HttpError(404, "Not Found");
        }
        res.json(result);
        
    }
    catch (error) {
        next(error)
    }
 }; // error HttpError is not a function - не работает
 

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact
}