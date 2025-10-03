import express from 'express';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    message: 'Contacts API is running',
    endpoints: {
      getAllContacts: 'GET /contacts',
      getContactById: 'GET /contacts/:contactId',
      createContact: 'POST /contacts',
      updateContact: 'PATCH /contacts/:contactId',
      deleteContact: 'DELETE /contacts/:contactId',
    },
  });
});

app.use('/contacts', contactsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
