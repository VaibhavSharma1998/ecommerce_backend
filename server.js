// server.js is responsible for starting your Express server.

// It imports the app instance from app.js and listens on a specific port.

// It also often handles environment configurations and connections to databases.

const mongoose = require("mongoose");

const app = require("./app");
const dotenv = require("dotenv");

dotenv.config({ path: "config/config.env" });

const DB_URI = process.env.DATABASE.replace(
  "<password>",
  process.env.PASSWORD_DATABASE
);

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01"
})

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas 😎 😂");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error.message);
  });

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "inr",
      amount: 100 * 100,
      description: "software payment test",
      automatic_payment_methods: {
        enabled: true 
      }
    })

    res.send({
      clientSecret: paymentIntent.client_secret
    })
  } catch (e) {
    res.status(400).send({
      error: {
        message: e.message
      }
    })
  }
});

// console.log(DB_URI)
// LISTEN

app.listen(process.env.PORT, () => {
  console.log(`Listening on Port ${process.env.PORT}`);
});
