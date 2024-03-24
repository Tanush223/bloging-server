const express = require("express");
const app = express();
const port = 3000;
const allRoutes = require("./Routes/index.routes");
const db = require("./model/db");

app.use(express.json());
app.use(allRoutes);

app.listen(port, () => {
  db.once("open", () => {
    console.log(`server is up running on port ${port} and connected to db`);
  }).on("error", (err) => {
    console.log("error wile conninting to db", err);
  });
});
