// Modules
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const db = require("./models/index");
const initialDataRoles = require("./data/initialData");
//Set up
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;
const Role = db.role;
const corsOptions = {
  origin: "http://localhost:3000",
};

db.sequelize
  .sync({ force: true })
  .then(() => {
    console.log("Drop and Resync Db");
    initialDataRoles(Role);
  })
  .catch((err) => {
    console.log(`Error =>> ${err}`);
  });

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "tuanHung-session",
    keys: [`${process.env.KEYS}`],
    httpOnly: true,
  })
);

//Routes
app.get("/", (req, res) => {
  res.send("<h1>==> Home Page <==</h1>");
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} `);
});
