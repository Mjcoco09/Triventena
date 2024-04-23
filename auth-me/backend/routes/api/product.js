const express = require("express");
const router = express.Router();
const { Product } = require("../../db/models");

// const getAllProducts = async (req, res) => {
//   try {
//     const products = await Product.find({});
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "server Error" });
//   }
// };
// const getAllProducts = async (req, res) => {
//   const products = await Product.find({});
//     res.json(products);
//   }
// const getProductById = async (req, res) => {
//   try {
//     const products = await Product.findById(req.params.id);
//     res.json(products);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "server Error" });
//   }
// };
//get all products
router.get("/", async (req, res, next) => {
  const query = {
    where: {},
  };
  const products = await Product.findAll(query);
  return res.json(products);
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
});
//get product by id
// router.get("/:id", getProductById);

module.exports = router;
