import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
let avatar = "";
let username = "";
const users = [];
const tweets = [];
app.post("/sign-up", (req, res) => {
  avatar = req.body.avatar;
  username = req.body.username;
  users.push({ username, avatar });
  console.log(users);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  username = req.body.username;
  const sameUser = users.find((el) => el.username === username);
  tweets.unshift({ username, avatar: sameUser.avatar, tweet: req.body.tweet });
  res.send("OK");
  console.log(tweets);
});

app.get("/tweets", (req, res) => {
  const MAX_SHOWN_TWEETS = 10;
  res.send(tweets.slice(0, MAX_SHOWN_TWEETS));
});

app.listen(5000);
