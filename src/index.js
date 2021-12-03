require('dotenv').config();

const app = require('./app');
const sequelize = require('./db');
const port = process.env.PORT || 5000;

(async () => {
  try {
    await app.listen(port);
    await sequelize.sync();
    console.log(`server running at the port ${port}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
