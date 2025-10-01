import express from "express";
import { ctrlWrapper } from "../utils/ctrl-wrapper.js";  // ✅ güncel dosya adı
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  updateContactController,
  deleteContactController,
} from "../controllers/contacts.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContactsController));
router.get("/:contactId", ctrlWrapper(getContactByIdController));
router.post("/", ctrlWrapper(createContactController));
router.patch("/:contactId", ctrlWrapper(updateContactController));
router.delete("/:contactId", ctrlWrapper(deleteContactController));

export default router;
