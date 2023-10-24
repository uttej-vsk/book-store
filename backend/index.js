import express from "express";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import { config } from "dotenv";
import booksRoutes from "./routes/booksRoute.js";
import cors from "cors";

config();

const PORT = process.env.express_PORT;
const mongoDB_URI = process.env.MONGODB_URI;
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));

app.get("/", function (req, res) {
  return res
    .status(200)
    .send(`<h1>Welcome to Vizag's largest E-Bookstore</h1>`);
});

app.use("/books", booksRoutes);

// async function runDBInstance() {
//   const client = new MongoClient(mongoDB_URI);

//   try {
//     await client.connect();
//     const dbName = "bookstore";
//     const database = client.db(dbName);
//     console.log('Connected to DB');
//   } catch (err) {
//     console.error(err);
//   } finally {
//     client.close();
//   }
// }

// async function startApp() {
//   try {
//     await runDBInstance();
//     app.listen(PORT, () => {
//       console.log(`Application is running on the port ${PORT}`);
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }

// startApp();

mongoose
  .connect(mongoDB_URI)
  .then(() => {
    console.log("App is connected to Database");
    app.listen(PORT, () => {
      console.log(`App is listening on the port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
