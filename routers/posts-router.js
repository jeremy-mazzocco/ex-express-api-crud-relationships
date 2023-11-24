const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts-controller');
const { body } = require("express-validator");


router.post(
    "/",
    body("slug").notEmpty().isString().trim(),
    body("image").notEmpty().isString().trim(),
    body("content").notEmpty().isString().trim(),
    body("categoryID").notEmpty().isInt(),
    body("published").notEmpty().isBoolean(),

    postsController.store
);






router.put('/:slug', postsController.update);

router.delete('/:slug', postsController.destroy);





module.exports = router;