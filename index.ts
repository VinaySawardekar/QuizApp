import { PORT } from "./src/config/constants";
import customLogger from "./src/utility/logger";
import createServer from "./src/utility/server";
import { environment } from "./src/config/environment";

const app = createServer();

app.listen(PORT, () => {
  customLogger.log(
    "info",
    `Server is running at ${environment.config.BASE_URL}${
      environment.env !== "production" ? `:${PORT}` : ``
    }`,
  );
});

export default app;
