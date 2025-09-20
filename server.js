const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const { initDb } = require("./database");
const static = require("./routes/static")

const app = express();

const contactsRoute = require("./routes/contacts-route");
const usersRoute = require("./routes/users-route");

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');


/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))


app.use(static)
app.get("/", (req, res,) => {
    res.render("index", { title: "Home" });
 })
app.use("/", contactsRoute);
app.use("/users", usersRoute);

app.use((err, req, res, next) => {
  console.error("🔥 Global error handler:", err.message);
  res.status(500).json({ error: "Something went wrong" });
});


const PORT = process.env.PORT || 8080;
// First connect to DB, then start server
initDb()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
    process.exit(1);
  });
