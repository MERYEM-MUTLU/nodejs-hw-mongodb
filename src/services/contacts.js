import { ContactModel } from '../models/contact.js';

export const getAllContacts = async () => {
  return await ContactModel.find();
};

export const getContactById = async (id) => {
  return await ContactModel.findById(id);
};

export const createContact = async (contactData) => {
  return await ContactModel.create(contactData);
};

export const updateContact = async (id, updateData) => {
  return await ContactModel.findByIdAndUpdate(id, updateData);
};

export const deleteContact = async (id) => {
  return await ContactModel.findByIdAndDelete(id);
};
