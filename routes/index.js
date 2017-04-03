const express = require('express');
const router = express.Router();


/* GET home page. */

router.get('/', function(req, res, next) {
  res.render("index");
});



 router.get('/*', function(req, res, next) {
   res.render(req.path.split('/')[1]);
 });




module.exports = router;
