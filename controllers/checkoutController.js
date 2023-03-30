require("dotenv").config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


const initiateStripeSession = async (req) => {
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [{
          price_data: {
            currency: "eur",
            product_data: {
              name: req.body.subscribtion.name
            },
            unit_amount: (req.body.subscribtion.amount * req.body.subscribtionMounths * 100).toFixed(0),
          },
          quantity: 1
        }],
        payment_intent_data:{
          metadata:{
            userId:req.body.userId, 
            subscribtionId:req.body.subscribtion._id, 
            subscribtionMounths:req.body.subscribtionMounths
          },
        },
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/`,
        cancel_url: `${process.env.CLIENT_URL}/`,
      });

    return session;
}

exports.createSession = async function (req, res) {
    try {
      const session = await initiateStripeSession(req);
      res.status(200).json({
        id: session.id,
        price: session.amout_total,
        currency: session.currency,
      });      
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  };