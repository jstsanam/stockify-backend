import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/environment.js";

connectDB();

app.listen(ENV.PORT, () => {
  console.log(`Server running on ${ENV.PORT}`);
});
