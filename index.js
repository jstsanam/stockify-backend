import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/environment.js";
import server from "./src/server.js";

// Connect to the database
connectDB();

server.listen(ENV.PORT, () => {
  console.log(`Server running on ${ENV.PORT}`);
});