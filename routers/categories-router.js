const {Router} = require('express');
const router = Router();
const categoriesController = require("../controllers/categories-controller");

router.post("/", categoriesController.store)

module.exports = router;