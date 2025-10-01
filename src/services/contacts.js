import { Contact } from "../db/models/Contact.js";

// GET all
export const getAllContacts = () => Contact.find();

// GET by ID
export const getContactById = (id) => Contact.findById(id);

// CREATE
export const createContact = (contactData) => Contact.create(contactData);

// UPDATE
export const updateContact = (id, updateData) => {
  return Contact.findByIdAndUpdate(id, updateData, { new: true });
};

// DELETE
export const deleteContact = (id) => Contact.findByIdAndDelete(id);
