const express = require("express");
const cors = require("cors");
const http = require("http");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();

app.use("/api/login", require("./routes/auth"));
app.use("/api/defects", require("./routes/metrics"));

server.listen(process.env.PORT || 3000, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
