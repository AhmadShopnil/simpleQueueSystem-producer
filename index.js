import express from "express";
import { Queue } from "bullmq";
import { register } from "./src/user/register.js";

const app = express();
const port = 5000;

const emailQueue = new Queue("email-queue", {
  connection: {
    host: "",
    port: 1245,
    username: "default",
    password: "",
  },
});

app.post("/register", async (req, res) => {
  console.log("Processing Register");

  // critical task  do first
  await register;

  // None critical task  send to queue
  await emailQueue.add("sendEmail", {
    from: "shopnil.dev@gmail.com",
    to: "student@gmail.com",
    subject: "Congrats on enrolling in Twitter Course",
    body: "Dear Student, You have been enrolled to Twitter Clone Course.",
  });

  return res.json({ status: "success", data: { message: "Register Success" } });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log("Testing queue server is running");
});
