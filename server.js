const express = require("express");
const path = require("path");
const { initDb } = require("./database");

const app = express();

const contactsRoute = require("./routes/contacts-route");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/contacts", contactsRoute);

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
