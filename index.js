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
  if (users.find((user) => user.username === username) !== undefined) {
    res.status(400).send("Usuário já utilizado");
  } else if (avatar.length === 0 || username.length === 0) {
    console.log(avatar);
    res.status(400).send("Todos os campos são obrigatórios!");
  } else if (!isImgValid()) {
    res
      .status(400)
      .send("A URL do avatar deve estar em uma extensão de imagem!");
  } else {
    users.push({ username, avatar });
    console.log(users);
    res.status(201).send("OK");
  }
});

function isImgValid() {
  return avatar.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

app.post("/tweets", (req, res) => {
  username = req.body.username;
  const tweet = req.body.tweet;
  const sameUser = users.find((el) => el.username === username);
  if (tweet.length === 0) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.unshift({ username, avatar: sameUser.avatar, tweet });
    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  const MAX_SHOWN_TWEETS = 10;
  res.send(tweets.slice(0, MAX_SHOWN_TWEETS));
});

app.listen(5000);
