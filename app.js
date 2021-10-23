require("dotenv").config();
const express = require("express");
const app = express();
const sequelize = require("./database/config");
// body parser
app.use(express.json());

// importing routes
const usersRoutes = require("./routes/users");
app.use(usersRoutes);
const postsRoutes = require("./routes/posts");
app.use(postsRoutes);

// root
app.get("/", function (req, res) {
  res.send({ message: "Root api." });
});

// 404, not match found
app.get("*", function (req, res) {
  res.status(404).send({ message: "Route not found" });
});

// testing DB connection and then start app
sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Connection with DB has been established successfully.");
    console.log("All models were synchronized successfully.");
    app.listen(3000);
  })
  .catch((error) => {
    console.error(error);
  });
