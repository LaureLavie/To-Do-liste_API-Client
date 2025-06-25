const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoute");
const taskRoute = require("./routes/taskRoute");

const app = express();
app.use(cookieParser()); // Pour lire les cookies

//Middlewares
app.use(
  cors({
    origin: "https://to-do-liste-api-client.onrender.com",
    credentials: true, // Remplacez par l'URL de votre frontend
  })
);
app.use(express.json()); //il permet de lire les données JSON envoyées
app.use("", userRoute);
app.use("", taskRoute);

// app.get("/", (req, res) => {
//   res.json({ message: "vous utilisez Express" });
// });
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("hey Jude, you're on MongoDB");
  })
  .catch((e) => console.log(e));

app.listen(PORT, () => console.log("Yoh, BRO, tu surfes sur " + PORT));
