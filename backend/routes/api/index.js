const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const productRouter = require("./product.js")
const reviewsRouter = require('./review.js')
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/products', productRouter);

router.use('/reviews', reviewsRouter);

router.post('/test', (req, res) => {
  res.json({ requestBody: req.body });
});

module.exports = router;


module.exports = router;
//!fuser -n tcp -k 8000
