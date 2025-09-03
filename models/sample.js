const { run } = require("../database")

async function getUserCollection() {
  const db = await run();
  return db.collection("listingsAndReviews"); 
}

module.exports = { getUserCollection };