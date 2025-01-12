import customLogger from "../utility/logger";
import { devConfig } from "./development.config";
import { prodConfig } from "./production.config";
import { localConfig } from "./local.config";
import * as dotenv from "dotenv"; // Import dotenv for environment variable loading

interface ENV {
  PORT: number;
  BASE_URL: string;
}
// Load environment variables from a specific path (recommended for security)
dotenv.config({ path: `${__dirname}/../../.env` });

const env: string = "development"; // Set a default environment
let config: ENV;

if (env !== "production" && env !== "development" && env !== "local") {
  customLogger.log("info", "----------Unknown Environment------------");
  customLogger.log(
    "info",
    `Only support production, development, or local environment.. NOT ${env} environment`,
  );
  customLogger.log("info", "-----------------------------------------");
  process.exit(1);
}

customLogger.log("info", "--------------------------------------");
customLogger.log("info", `Running on ${env} environment...`);
customLogger.log("info", "--------------------------------------");

if (env === "production") {
  config = prodConfig;
} else if (env === "development") {
  config = devConfig;
} else if (env === "local") {
  config = localConfig;
} else {
  config = localConfig;
}

export const environment = {
  env,
  config,
};
