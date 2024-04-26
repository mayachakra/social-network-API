const router = require("express").Router();
const apiRoutes =require('./api');

router.use('/api', apiRoutes);
router.use((req,res) => res.send('Wrong Route. Check your routing!'));


module.exports = router;