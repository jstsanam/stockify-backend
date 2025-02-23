import { createServer } from "http";
import { app } from "./app.js";
import { Server } from "socket.io";
import { ENV } from "./config/environment.js";
import { TransactionType } from "./constants/enums.js";

const server = createServer(app);

export const io = new Server(server, {
  cors: {
    origin: ENV.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"]
});

io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // Join Room (Stock Detail Page)
  socket.on("joinStockRoom", ({ stockId }) => {
    socket.join(stockId);
  });

  // Leave Room
  socket.on("leaveStockRoom", ({ stockId }) => {
    socket.leave(stockId);
  });

  // Handle Buy/Sell Transactions
  socket.on("stockTransaction", ({ stockId, name, type, stock_quantity, timestamp }) => {
    // Broadcast the transaction to others in the room (excluding sender)
    const action = type === TransactionType.BUY ? "bought" : "sold";
    const stock = stock_quantity > 1 ? "stocks" : "stock";

    socket.to(stockId).emit("transactionUpdate", {
      message: `${name} ${action} ${stock_quantity} ${stock}.`,
      time: timestamp
    });
  });

  socket.on("disconnect", () => {
    console.log(`A user disconnected: ${socket.id}`);
  });
});

export default server;
