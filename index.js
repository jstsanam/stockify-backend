import { app } from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/config/environment.js";

connectDB();

const port = ENV.PORT;
app.listen(port, () => {
  console.log(`Server running on ${ENV.BASE_URL + port}`);
});
