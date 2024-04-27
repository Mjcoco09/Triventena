const express = require("express");
const router = express.Router();
const {
    User,
    Product,
    Review
  } = require("../../db/models");
  const { requireAuth } = require("../../utils/auth");
  const { handleValidationErrors } = require("../../utils/validation");
  const { check } = require("express-validator");

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


  router.put("/:reviewId", [requireAuth, validReview], async (req, res, next) => {
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    try {
      const existingReview = await Review.findOne({
        where: {
          id: reviewId,
          userId: userId,
        },
      });

      if (!existingReview) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }

      existingReview.review = review;
      existingReview.stars = stars;

      await existingReview.save();

      return res.json(existingReview);
    } catch (err) {
      next(err);
    }
  });

  router.delete("/:reviewId", requireAuth, async (req, res, next) => {
    const reviewId = Number(req.params.reviewId);
    const userId = req.user.id;

    try {
      const existingReview = await Review.findOne({
        where: {
          id: reviewId,
          userId: userId,
        },
      });

      if (!existingReview) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
      }

      await existingReview.destroy();

      return res.json({ message: "Successfully deleted" });
    } catch (err) {
      next(err);
    }
  });

  module.exports = router;
