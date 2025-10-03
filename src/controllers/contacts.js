import createError from 'http-errors';
import * as contactsService from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const getAllContacts = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: "Successfully found contact with id " + contactId,
    data: contact,
  });
};

const createContact = async (req, res) => {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const contactData = {
    name,
    phone_number: phoneNumber,
    email,
    is_favourite: isFavourite || false,
    contact_type: contactType,
  };

  const newContact = await contactsService.createContact(contactData);

  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

const updateContact = async (req, res) => {
  const { contactId } = req.params;
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (phoneNumber !== undefined) updateData.phone_number = phoneNumber;
  if (email !== undefined) updateData.email = email;
  if (isFavourite !== undefined) updateData.is_favourite = isFavourite;
  if (contactType !== undefined) updateData.contact_type = contactType;

  const updated = await contactsService.updateContact(contactId, updateData);

  if (!updated) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updated,
  });
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await contactsService.deleteContact(contactId);

  if (!deleted) {
    throw createError(404, "Contact not found");
  }

  res.status(204).send();
};

export default {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
