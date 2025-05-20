const router = require('express').Router();

router.get("/", (req, res) => {
    res.send("Hello to movies DB");
});

router.use("/movies", require('./movies'));

module.exports = router;