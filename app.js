// import express from "express";
// import morgan from "morgan";
// import cors from "cors";

// import contactsRouter from "./routes/contactsRouter.js";

const express = require("express"); // imported express for creating web server
const morgan = require("morgan");
const cors = require("cors");
const contactsRouter = require("./routes/contactsRouter");


const app = express(); // here we created web server


app.get("/books", (request, response) => {
  response.send("<h1>Books in my library</h1>")
});

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json()); // checks if https request has a body - turns a string into an object

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err; // for next(error) in catch contactsControllers
  res.status(status).json({ message });
});

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000"); // started web server
});