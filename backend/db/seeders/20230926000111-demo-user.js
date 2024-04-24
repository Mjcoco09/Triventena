"use strict";

const { User, Product,Review } = require("../models");
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await User.bulkCreate(
      [
        {
          firstName: "Joe",
          lastName: "Smoe",
          email: "demo@user.io",
          username: "Demo-lition",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          firstName: "Joey",
          lastName: "Smoey",
          email: "user1@user.io",
          username: "FakeUser1",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          firstName: "Joerrr",
          lastName: "Smoerrr",
          email: "user2@user.io",
          username: "FakeUser2",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      { validate: true }
    );

    await Product.bulkCreate([
      {
        name: "Sweater",
        description: "this is a sweater",
        price: 70,
        count: 100,
        imageUrl: "https://i.postimg.cc/gkKZQC5g/back-jpg.png",
      },
      {
        name: "levi sticker",
        description: "this is a levi sticker",
        price: 100,
        count: 100,
        imageUrl: "https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png",
      },
      {
        name: "makima sticker",
        description: "this is a makima sticker",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/VvX1nqMW/Makima-Wood.png",
      },
      {
        name: "Killua sticker",
        description: "this is a Killua sticker",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/pLHMb5jg/Killua-Pink.png",
      },
    ]);
    await Review.bulkCreate([
      {
        productId: 1,
        userId: 1,

        review: "What a cool item",
        stars: 4,
      },
      {
        productId: 2,
        userId: 2,

        review: "Crazy how cheap these are ",
        stars: 5,
      },
      {
        productId: 3,
        userId: 3,

        review: "meh it was okay",
        stars: 1,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
