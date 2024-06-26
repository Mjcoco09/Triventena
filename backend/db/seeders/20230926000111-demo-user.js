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
          "Introducing the Levi Your Ride is Filthy, Clean it Up Sticker Elevate your vehicle's cleanliness with our no-nonsense Levi car sticker Crafted from durable vinyl material, this sticker is built to withstand the elements and adhere seamlessly to your car's surface. Whether you're a fan of Attack on Titan or simply appreciate a spotless ride, Levi's commanding presence will motivate you to maintain the utmost cleanliness.",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/0jhxJtbQ/Levi-Blue.png",
      },
      {
        name: "makima sticker",
        description:
          "Introducing our Makima Keep Your Eyes on the Road or Die Sticker!Stay focused and stay safe with our captivating Makima sticker! Crafted with durable vinyl, this sticker is perfect for your car, laptop, or water bottle. With its bold design and powerful message, Keep Your Eyes on the Road or Die, it serves as a constant reminder to prioritize road safety.But that's not all! Our sticker is weatherproof and waterproof, ensuring its longevity no matter where you choose to display it!",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/VvX1nqMW/Makima-Wood.png",
      },
      {
        name: "Killua sticker",
        description:
          "Introducing the Killua Wanna See Godspeed? Car Sticker!Unleash the racing beast within with our sleek Killua car sticker! Inspired by the lightning-fast agility of Godspeed, this sticker subtly poses the question: Wanna See GodspeedCrafted from durable vinyl designed to endure the speed and thrill of racing, this sticker adds a touch of adrenaline to your cars exterior!",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/pLHMb5jg/Killua-Pink.png",
      },
      {
        name: "Yake Energy",
        description:
          "Introducing Yake Energy, the ultimate pick-me-up in a can! Bursting with exhilarating flavors and infused with a powerful blend of energizing ingredients, Yake Energy is your go-to companion for those moments when you need an extra boost of vitality. With its electrifying taste and invigorating fizz, each sip of Yake Energy sparks a wave of energy, propelling you through your day with unstoppable momentum. Whether you're conquering your workout, powering through a deadline, or seizing the day with gusto, Yake Energy is here to fuel your adventures and unleash your inner dynamo. Crack open a can and elevate your energy game to new heights with Yake Energy",
        price: 55,
        count: 100,
        imageUrl: "https://i.postimg.cc/qqTgNdcM/Designer.jpg",
      },
      {
        name: "Galactic Gush",
        description:
          "Embark on a taste odyssey with Galactic Gush, the cosmic soda sensation that's out of this world! With each fizzy sip, you'll be transported on a flavor journey through the far reaches of the galaxy. Feel the rush of stardust-infused bubbles as they dance across your taste buds, delivering a burst of intergalactic flavors that defy earthly imagination. From the tangy tang of asteroid orange to the cosmic crush of lunar lemon-lime, every drop of Galactic Gush is a cosmic delight. So grab a can, brace yourself for warp speed, and get ready to experience flavor that's truly light years ahead!",
        price: 40,
        count: 100,
        imageUrl: "https://i.postimg.cc/MTbqrfRq/Designer-1.jpg",
      },
      {
        name: "Dreamcatcher Delight Tea",
        description:
          "Indulge in a moment of tranquility with Dreamcatcher Delight Tea, a soothing blend crafted to capture the essence of peaceful dreams and gentle serenity. Infused with the whispers of moonlit nights and the soft caress of gentle breezes, each sip of this enchanting tea envelops you in a cocoon of calm and tranquility. Let the delicate flavors of chamomile, lavender, and vanilla dance on your palate, soothing your senses and lulling you into a state of blissful relaxation. Whether enjoyed as a morning ritual or a nighttime indulgence, Dreamcatcher Delight Tea is your invitation to drift away on clouds of dreams and awaken refreshed, rejuvenated, and ready to embrace the day.",
        price: 25,
        count: 100,
        imageUrl: "https://i.postimg.cc/j2S0ggt4/Designer-3.jpg",
      },
      {
        name: "Sparkleberry Fizz",
        description:
          "Get ready to experience a burst of joy with Sparkleberry Fizz, the sparkling sensation that's as effervescent as it is delightful! Infused with the essence of ripe, juicy berries and a touch of sparkling magic, each sip of Sparkleberry Fizz is a celebration in a bottle. Feel the fizzy bubbles dance on your tongue, tickling your taste buds with bursts of fruity flavor and effervescent effervescence. With its vibrant hues and sparkling charm, Sparkleberry Fizz is the perfect companion for any occasion, whether you're toasting to a special moment or simply adding a bit of sparkle to your day. So pop the cap, raise your glass, and let the sparkle begin with Sparkleberry Fizz",
        price: 30,
        count: 100,
        imageUrl: "https://i.postimg.cc/nrP5dndn/Designer-4.jpg",
      },
      {
        name: "Celestial Serenade Syrup",
        description:
          "Embark on a celestial journey with Celestial Serenade Syrup, a magical elixir that transforms every moment into a celestial symphony of sweetness. Crafted under the watchful gaze of the stars and infused with the essence of cosmic harmony, each drop of this enchanting syrup is a melody for the senses",
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
          "Unlock the secrets of the cosmos with the Oracle's Eye Amulet, a mystical artifact that holds the key to ancient wisdom and divine insight. Crafted by the hands of celestial artisans and imbued with the essence of cosmic magic, each Oracle's Eye Amulet is a conduit for divine guidance and mystical revelation. Wear it close to your heart and feel its power resonate within you, opening your eyes to the hidden truths that lie beyond the veil of reality. Whether you seek answers to life's mysteries or guidance on your spiritual journey, the Oracle's Eye Amulet is your faithful companion, guiding you with its all-seeing gaze and illuminating the path to enlightenment",
        price: 10,
        count: 100,
        imageUrl: "https://i.postimg.cc/xTWj8Q0r/Designer-8.jpg",
      },
      {
        name: "Soulstone Pendant",
        description:
          "Unleash the power of the soul with the Soulstone Pendant, a mystical artifact adorned with celestial gemstones and ancient symbols. Said to contain the essence of the soul itself, this legendary pendant channels the energies of the cosmos, granting its wearer a connection to the realms beyond. Unlock the mysteries of existence and embark on a journey of spiritual enlightenment with the Soulstone Pendant as your guide.",
        price: 25,
        count: 100,
        imageUrl: "https://i.postimg.cc/qRb4TVm5/Designer-9.jpg",
      },
      {
        name: "Dreamweaver's Locket",
        description:
          "Embark on a journey through the realms of dreams with the Dreamweaver's Locket, a magical talisman that holds the essence of dreams within its gleaming frame. As you wear this enchanting locket close to your heart, feel the whispers of imagination and the shimmering threads of dreams intertwining with your reality. Let the Dreamweaver's Locket be your portal to a world of limitless possibilities, where dreams take flight and wishes come true",
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
