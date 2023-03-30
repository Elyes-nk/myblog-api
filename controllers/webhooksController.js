require("dotenv").config();
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.stripewebhook = (req, res) => {
  let data;
  let eventType;
  const webhookSecret = process.env.WEBHOOK_SECRET_KEY;

  if (webhookSecret) {
    let event;
    let signature = req.headers["stripe-signature"];

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        webhookSecret
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`, err);
      return res.sendStatus(400);
    }
    data = event.data;
    eventType = event.type;
  } else {
    data = req.body.data;
    eventType = req.body.type;
  }
  console.log(eventType);
  switch (eventType) {
    case "payment_intent.created":
      const transactionCreated = new Transaction({
          user: data.object.metadata.userId,
          subscribtion: data.object.metadata.subscribtionId,
          status: "Pending"
        })
        transactionCreated.save().catch(err => console.log(err));
    break;

    case "payment_intent.succeeded":
      const updateUser = async()=> {
      try{
          await User.findByIdAndUpdate(
            data.object.metadata.userId,
            {
              subscribtion: data.object.metadata.subscribtionId,
              subscribtionDate: new Date(), 
              subscribtionMounths: data.object.metadata.subscribtionMounths
            },
            { new: true }
          )
        }catch(err)
        {console.log(err);}
      }
      updateUser()
          const transaction = new Transaction({
            user: data.object.metadata.userId,
            subscribtion: data.object.metadata.subscribtionId,
            status: "Approved"
          })
          transaction.save().catch(err => console.log(err));
    break;

    case "payment_intent.payment_failed":
      const transactionDeclined = new Transaction({
          user: data.object.metadata.userId,
          subscribtion: data.object.metadata.subscribtionId,
          status: "Declined"
        })
        transactionDeclined.save().catch(err => console.log(err));
    break;

    default:
  }
  res.sendStatus(200);
};