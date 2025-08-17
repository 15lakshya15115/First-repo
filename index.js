const { log } = require("console");
let express = require("express");
let path = require("path");
let app = express();
const methodoverride = require("method-override");
app.use(methodoverride("_method"));
app.use(express.urlencoded({ extended: true }));
let port = 3000;
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require("uuid");
let posts = [
  {
    id: uuidv4(),
    username: "Lakshya",
    content: "I love riding",
  },
  {
    id: uuidv4(),
    username: "Karan",
    content: "I love eating",
  },
];
app.get("/posts", (req, res) => {
  res.render("main.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.post("/posts", (req, res) => {
  let id = uuidv4();
  let { username, content } = req.body;
  posts.push({ id, username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newcont = req.body.content;
  let post = posts.find((p) => id == p.id);
  post.content = newcont;
  console.log(post);
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id == p.id);
  res.render("edit.ejs", { post });
});
app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id != p.id);
  res.redirect("/posts");
});

app.listen(port, () => {
  console.log(`Started ${port}`);
});
