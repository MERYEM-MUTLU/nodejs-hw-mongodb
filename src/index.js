import { setupServer } from "./server.js";
import "dotenv/config";
import { initMongoConnection } from "./db/initMongoConnection.js";

const start = async () => {
  await initMongoConnection();
  setupServer();
};
start();