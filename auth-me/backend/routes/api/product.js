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
const getProductById = async (req, res) => {
  try {
    const products = await Product.findById(req.params.id);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "server Error" });
  }
};
//get all products
router.get("/", async(req,res,next) =>{
  const query = {
    where: {},
  };
const products= await Product.findAll(query)
return res.json(products)
});
//get product by id
router.get("/:id", getProductById);

module.exports = router;
