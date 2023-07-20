const userRouter = require('./user.router');
const commentRouter = require('./comment.route');
const oderRouter = require('./oder.router');
const oderItemRouter = require('./oderItem.router');
const bookRouter = require('./book.route');
const storeImage = require('./storeImage.route');
const historyRouter = require('./historys.route');
function Routes(app) {
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/comment', commentRouter);
  app.use('/api/v1/Oder', oderRouter);
  app.use('/api/v1/book', bookRouter);
  app.use('/api/v1/oderItem', oderItemRouter);
  app.use('/api/v1/image', storeImage);
  app.use('/api/v1/history', historyRouter);
  // app.use('/api/v1/history', historyRouter);
}

module.exports = Routes;
