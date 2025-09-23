const { initDb } = require("../database")

async function getUserCollection() {
  const db = await initDb();
  return db.collection("listingsAndReviews"); 
}

// async function seedContacts() {
//   const db = await initDb();
//   const contacts = db.collection("contacts");

//   const docs = [
//   ];
//   try {
//     const result = await contacts.insertMany(docs);
//     console.log(`✅ Inserted ${result.insertedCount} contacts`);
//   } catch (err) {
//     console.error("❌ Insert failed:", err);
//   } finally {
//     process.exit(); // close script when done
//   }
// }

// seedContacts();


module.exports = {
  getUserCollection,
  testDB
};