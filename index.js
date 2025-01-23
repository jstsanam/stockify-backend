import { app } from "./src/app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

dotenv.config();
connectDB();

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${process.env.BASE_URL + port}`);
});
