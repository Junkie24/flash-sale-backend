const express = require("express");
const { body , query } = require("express-validator");

const {createItem , viewItems} = require("../controllers/itemsControllers")

const router = express.Router();

router.post(
  "/create",
  body("name").isString().notEmpty().withMessage("name is required"),
  body("stock").isString().notEmpty().withMessage("stock is required"),
  createItem
);


router.get(
    "/view",
    query("page").isString().notEmpty().withMessage("page is required"),
    query("limit").isString().notEmpty().withMessage("limit is required"),
    viewItems
  );


module.exports = router;
