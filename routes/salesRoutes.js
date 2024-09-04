const express = require("express");
const { param,body } = require("express-validator");

const {createSale} = require("../controllers/salesControllers")

const router = express.Router();

router.post(
  "/:item_id",
  param("item_id").isMongoId().withMessage("Invalid item_id format"),
  body("quantity").isString().notEmpty().withMessage("quantity is required"),
  createSale
);


module.exports = router;
