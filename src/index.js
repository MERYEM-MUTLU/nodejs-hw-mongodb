import "dotenv/config";
import { setupServer } from "./server.js";
import { initMongoConnection } from "./db/initMongoConnection.js";

const start = async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (err) {
    console.error("Failed to start the server:", err);
  }
};

start();