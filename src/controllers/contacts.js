import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from "../services/contacts.js";
import createHttpError from "http-errors";
import { Contact } from "../db/models/Contact.js";
import { uploadToCloudinary } from "../services/cloudinary.js";


export const getContactsController = async (req, res) => {
  const {
    page = 1,
    perPage = 10,
    sortBy = "name",
    sortOrder = "asc",
    type,
    isFavourite,
  } = req.query;

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
  });

  res.status(200).json({
    status: 200,
    message: "Successfully found contacts!",
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, "Contact not found");
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  try {
    const data = { ...req.body, owner: req.user?._id };
    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      data.photo = result.secure_url;
    }
    const contact = await Contact.create(data);
    res.status(200).json({
      status: 200,
      message: "Successfully created contact!",
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = { ...req.body };
    if (req.file?.buffer) {
      const result = await uploadToCloudinary(req.file.buffer);
      data.photo = result.secure_url;
    }
    const updated = await Contact.findByIdAndUpdate(contactId, data, { new: true });
    if (!updated) throw createHttpError(404, "Contact not found!");
    res.status(200).json({
      status: 200,
      message: "Successfully updated contact!",
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(200).json({
    status: 200,
    message: "Successfully patched a contact!",
    data: result,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await deleteContact(contactId);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(200).json({
    status: 200,
    message: "Successfully deleted a contact!",
  });
};