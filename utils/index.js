const router = require('express').Router();
const htmlRoutes = require('../../../Downloads/module-18-starter/routes/html/html-routes');

router.use('/', htmlRoutes);

router.use((req, res) => {
  res.status(404).send('<h1>😝 404 Error!</h1>');
});

module.exports = router;
