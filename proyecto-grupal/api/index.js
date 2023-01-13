const server = require("./src/app.js");
const { conn } = require("./src/db.js");

const {
  storeAllCategories,
  storeAllProducts,
  storeAllUsers,
  createNewAdminUser,
} = require("./src/Controllers/dbcharge/dbcharge");

const port = process.env.port || 3001;
// Syncing all the models at once.

conn.sync({ force: true }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console

    await storeAllCategories();
    await storeAllProducts();
    await storeAllUsers();
    await createNewAdminUser();
  });
});
