"use strict";

const { User, Product } = require("../models");
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
        imageUrl: "https://ibb.co/26yxCV7",
      },
      {
        name: "levi sticker",
        description: "this is a levi sticker",
        price: 10,
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
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
