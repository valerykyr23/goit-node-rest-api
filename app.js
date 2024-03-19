import "dotenv/config";
import express from "express";
import "./db/contacts.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();

app.use(express.json());

app.use("/users", authRouter);
app.use("/api/contacts", contactsRouter);
app.use(express.static("public"));

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

app.listen(8080, () => {
  console.log("Server is running. Use our API on port: 8080");
});