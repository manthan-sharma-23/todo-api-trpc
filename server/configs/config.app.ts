import { config } from "dotenv";
import path = require("path");

config({ path: path.join(__dirname, "../../.env") });

export const appConfig: {
  port: number;
  url: string;
  secretKey: string;
} = {
  port: Number(process.env.PORT) || 4000,
  url: "",
  secretKey: String(process.env.SECRET_KEY),
};

appConfig.url = `http://localhost:${appConfig.port}`;
