import routers from "../routers/index";
import { apiPath, maxLimit } from "../config/constants";
import { environment } from "../config/environment";
import express = require("express");
import rateLimit from "express-rate-limit";
import * as path from "path";
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const morgan = require("morgan");
const morganTiny = morgan("tiny");
const helmet = require("helmet");
const compression = require("compression");
/**
 * Creates a express server for the Quiz App.
 * - It has configuration for cors, limiter, helmet, compression, swagger, db, and routes path.
 * @author Vinay Sawardekar <https://www.linkedin.com/in/vinay-sawardekar/>
 */
const createServer = () => {
  const app = express();
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    }),
  );
  // Setting up the CORS middleware
  let corsOptions = {
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  };
  app.use(cors(corsOptions));
  app.use((req, res, next): any => {
    if (req.method == "OPTIONS") {
      return res.status(200).json({});
    }

    next();
  });

  // Setting up Rate Limiter
  const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: maxLimit,
  });

  // Setting up Helmet / Compression
  app.use(helmet());
  app.disable("x-powered-by");
  app.use(compression());

  /** Swagger only accesible for development and local environment */
  if (environment.env === "development" || environment.env === "local") {
    const swaggerFile = require("../../public/docs/swagger-output.json");
    app.use(
      "/docs",
      swaggerUI.serve,
      swaggerUI.setup(swaggerFile, {
        swaggerOptions: { persistAuthorization: true },
      }),
    );
  }

  /** Api Versioning */
  app.use(`${apiPath.PATH}${apiPath.VERSION}`, [morganTiny, limiter], routers);
  return app;
};

export default createServer;
