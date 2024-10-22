"use strict";

const { User, Product, Review } = require("../models");
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
        description: "Street wear and art Collab? Whats there more to say",
        price: 70,
        count: 100,
        imageUrl: "https://i.postimg.cc/gkKZQC5g/back-jpg.png",
      },
      {
        name: "levi sticker",
        description:
          "Keep your ride clean with the Levi sticker. Crafted from durable vinyl, this no-nonsense car decal is built to last, perfect for Attack on Titan fans or anyone who values a spotless vehicle.",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png",
      },
      {
        name: "makima sticker",
        description:
          "Stay focused with the Makima 'Keep Your Eyes on the Road or Die' sticker. Made from durable, weatherproof vinyl, it's perfect for cars, laptops, or water bottles, reminding you to prioritize safety.",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/VvX1nqMW/Makima-Wood.png",
      },
      {
        name: "Killua sticker",
        description:
          "Unleash your inner racer with the Killua 'Wanna See Godspeed?' car sticker. Made from durable vinyl, it's inspired by Killua's agility and adds a touch of adrenaline to your ride",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/pLHMb5jg/Killua-Pink.png",
      },
      {
        name: "Yake Energy",
        description:
          "Yake Energy is your ultimate pick-me-up, bursting with bold flavors and a powerful blend of energizing ingredients. Perfect for workouts, deadlines, or daily adventures, each sip fuels unstoppable momentum",
        price: 55,
        count: 100,
        imageUrl: "https://i.postimg.cc/qqTgNdcM/Designer.jpg",
      },
      {
        name: "Galactic Gush",
        description:
          "Galactic Gush is a cosmic soda that takes your taste buds on an interstellar journey. Enjoy stardust-infused bubbles with flavors like asteroid orange and lunar lemon-lime. It's truly out of this world!",
        price: 40,
        count: 100,
        imageUrl: "https://i.postimg.cc/MTbqrfRq/Designer-1.jpg",
      },
      {
        name: "Dreamcatcher Delight Tea",
        description:
          "Dreamcatcher Delight Tea is a soothing blend of chamomile, lavender, and vanilla that captures the essence of tranquility. Each sip brings calm and relaxation, perfect for morning or nighttime indulgence.",
        price: 25,
        count: 100,
        imageUrl: "https://i.postimg.cc/j2S0ggt4/Designer-3.jpg",
      },
      {
        name: "Sparkleberry Fizz",
        description:
          "Sparkleberry Fizz is a berry-infused sparkling drink that brings joy in every sip. With vibrant hues and fizzy bubbles, it's perfect for celebrations or adding a touch of sparkle to your day.",
        price: 30,
        count: 100,
        imageUrl: "https://i.postimg.cc/nrP5dndn/Designer-4.jpg",
      },
      {
        name: "Celestial Serenade Syrup",
        description:
          "Celestial Serenade Syrup is a magical elixir that turns every moment into a sweet, celestial symphony. Infused with cosmic harmony, each drop is a melody for the senses",
        price: 70,
        count: 100,
        imageUrl: "https://i.postimg.cc/rF2YwZvn/Designer-6.jpg",
      },
      {
        name: "Oracle's Eye Amulet",
        description: "",
        price: 900,
        count: 100,
        imageUrl: "https://i.postimg.cc/NjpNbsLS/Designer-7.jpg",
      },
      {
        name: "Aurora Shard",
        description:
          "The Oracle's Eye Amulet is a mystical artifact, crafted with cosmic magic to unlock ancient wisdom and divine insight. Wear it close to uncover hidden truths and guide your spiritual journey",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/xTWj8Q0r/Designer-8.jpg",
      },
      {
        name: "Soulstone Pendant",
        description:
          "The Soulstone Pendant, adorned with celestial gemstones, channels cosmic energy to connect its wearer to realms beyond. Unlock spiritual enlightenment with this mystical artifact",
        price: 25,
        count: 100,
        imageUrl: "https://i.postimg.cc/qRb4TVm5/Designer-9.jpg",
      },
      {
        name: "Dreamweaver's Locket",
        description:
          "The Dreamweaver's Locket is a magical talisman that holds the essence of dreams. Wear it close to your heart and let it be your portal to limitless possibilities and wish fulfillment",
        price: 80,
        count: 100,
        imageUrl: "https://i.postimg.cc/htcDTr7M/Designer-11.jpg",
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
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Reviews", null, {});
    await queryInterface.bulkDelete("Products", null, {});
    await queryInterface.bulkDelete("Users", null, {});
  },
};
