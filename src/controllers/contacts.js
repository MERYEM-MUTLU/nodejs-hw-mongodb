import createError from "http-errors";
import * as contactsService from "../services/contacts.js";

// GET all
export const getContactsController = async (req, res) => {
  const contacts = await contactsService.getAllContacts();
  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

// GET by ID
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contactsService.getContactById(contactId);

  if (!contact) {
    throw createError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

// POST create
export const createContactController = async (req, res) => {
  const newContact = await contactsService.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: "Successfully created a contact!",
    data: newContact,
  });
};

// PATCH update
export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const updated = await contactsService.updateContact(contactId, req.body);

  if (!updated) {
    throw createError(404, "Contact not found");
  }

  res.json({
    status: 200,
    message: "Successfully patched a contact!",
    data: updated,
  });
};

// DELETE
export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const deleted = await contactsService.deleteContact(contactId);

  if (!deleted) {
    throw createError(404, "Contact not found");
  }

  res.status(204).send();
};
