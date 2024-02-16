// import contactsService from "../services/contactsServices.js";
const contactsServices = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
    try { 
    const result = await contactsServices.listContacts();
    res.status(200).json(result);
    }
    catch(error)
    {
        next(error);
     }
    
 };

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
 };

 const deleteContact = (req, res) => {};

const createContact = async (req, res, next) => {
    try { 
        const result = await contactsServices.addContact(req.body);
        res.status(201).json(result);
    }
    catch (error) {
        next(error)
    }
 };

const updateContact = (req, res) => { };
 

module.exports = {
    getAllContacts,
    getOneContact,
    deleteContact,
    createContact,
    updateContact
}