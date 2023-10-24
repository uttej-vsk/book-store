import express from "express";
import { Book } from "../models/bookmodel.js";
const router = express.Router();

router.get("/", async function (req, res) {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.get("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "send all required fields: title, author, publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    await res.status(200).send(book);
    console.log("Book posted successfully");
  } catch (error) {
    await res.status(500).send({ message: error.message });
    console.log(error.message);
  }
});

router.put("/:id", async function (req, res) {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = req.params;
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(201).send({ message: "Book was updated successfully" });
    console.log("Book updated successfully");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error.message });
  }
});

router.delete("/:id", async function (req, res) {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      res
        .status(401)
        .send("Id is either invalid or there is no content in this place");
    }

    res.status(201).send(`Book at the id ${id} was deleted successfully`);
    console.log("Book deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error.message });
  }
});

export default router;
