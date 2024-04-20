const express = require("express");
const router = express.Router();
const {Product} = require("../../db/models")


const getAllProducts = async (req,res) =>{
    try{
        const products = await Product.find({})
        res.json(products)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"server Error"})
    }
}
const getProductById = async (req,res) =>{
    try{
        const products = await Product.findById(req.params.id)
        res.json(products)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"server Error"})
    }
}
//get all products
router.get("/",getAllProducts)
//get product by id
router.get("/:id",getProductById)

module.exports = router;
