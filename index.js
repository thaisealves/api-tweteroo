import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
let avatar = "";
const users = [];
const tweets = [];
app.post("/sign-up", (req, res) => {
  avatar = req.body.avatar;
  users.push({ username: req.body.username, avatar: avatar });
  console.log(users);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  tweets.unshift({ username: req.body.username, tweet: req.body.tweet });
  res.send("OK");
  console.log(tweets);
});

app.listen(5000);
