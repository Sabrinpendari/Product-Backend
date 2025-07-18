const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const productRouter = require("./routes/productRoutes");
const authRouter = require("./controllers/authRoutes");
const cros = require("cors");

const PORT = 3000;

dotenv.config();
const app = express();
app.use(cros());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "server is running",
  });
});

app.use("/products", productRouter);

app.use("/auth", authRouter);

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("connected to mongodb successfully");

    app.listen(PORT, () => {
      console.log("server is running ");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to mongodb");
    console.log(err.message);
  });

app.listen(PORT, () => {
  console.log("server is running ");
});
