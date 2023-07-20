const app = require('./app/app');
const sequelize = require('./libs/database/connect.mysql');

const port = 8080;
app.listen(port, async () => {
  console.log(`listening on port http://localhost:${port}`);
  try {
    await sequelize.authenticate();
    console.log('connect mysql successfully');
  } catch (error) {
    console.log('err', error);
  }
});
