const express = require("express");
const router = express.Router();
const { requireAuth } = require("../../utils/auth");
const { Product, Review,User } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const validReview = [
  check("review")
    .exists({ checkFalsy: true })
    .withMessage("Review text is required"),
  check("stars")
    .exists({ checkFalsy: true })
    .isInt({ min: 1, max: 5 })
    .withMessage("Stars must be an integer from 1 to 5"),
  handleValidationErrors,
];

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

router.post(
  "/:productId/reviews",
  [requireAuth, validReview],
  async (req, res, next) => {
    const thisProductId = Number(req.params.productId);
    const userId = req.user.id;
    const { review, stars } = req.body;
    const product = await Product.findByPk(thisProductId);

    if (!product) {
      const err = new Error();
      err.status = 404;
      err.message = "Product couldn't be found";
      return next(err);
    }

    const existingReview = await Review.findOne({
      where: {
        userId,
        productId: thisProductId,
      },
    });

    if (existingReview) {
      const err = new Error();
      err.status = 500;
      err.message = "User already has a review for this product";
      return next(err);
    }

    const newReview = await Review.create({
      productId: thisProductId,
      userId,
      review,
      stars,
    });

    return res.json(newReview);
  }
);


//works
router.get("/:productId/reviews", async (req, res, next) => {
  const productId = Number(req.params.productId);
  const isProduct = await Product.findByPk(productId);

  if (!isProduct) {
    const err = new Error();
    err.status = 404;
    err.message = "Product couldn't be found";
    return next(err);
  }

  const filter = {
    where: {
      productId,
    },
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName"],
      },
    ],
  };

  const reviews = await Review.findAll(filter);

  return res.json({ Reviews: reviews });
});

module.exports = router;
