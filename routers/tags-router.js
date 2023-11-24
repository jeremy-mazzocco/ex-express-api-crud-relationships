const {Router} = require('express');
const router = Router();
const tagsController = require("../controllers/tags-controller");

router.post("/", tagsController.store)

module.exports = router;