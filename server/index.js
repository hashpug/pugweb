import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';

import stripeLoader from 'stripe';
const stripe_secret = 'sk_test_51Hs4cOE1spxKL6987T9ZAUSsLLklsnFqpERjTAoS9V720ZtjORFDA52qogmIjzi6ZLKdiDjLgd0LIeOZLqnBjxNh00Lcklw5rL';

// sripe price id
const PRICE_ID = 'price_1JCKYAE1spxKL698hFTNle3W';
const TRIAL_INTERVAL = 1000 * 60 * 60 * 24 * 30;

const stripe = stripeLoader(stripe_secret);

// Create express instance
const app = express()
app.use(bodyParser.json());
app.use(helmet());

app.post('/create_subscription', async (req, res, next) => {
  const { email, card_token } = req.body;
  const customer = await stripe.customers.create({
    email, source : card_token
  }).catch(e => {
    return null;
  });
  if (!customer) {
    res.status(400).send({
      error : 'Bad request. Customer cannot create'
    });
    return;
  }
  const customer_id = customer.id;
  const subscription = await stripe.subscriptions.create({
    customer : customer_id
    , items : [
      { price : PRICE_ID }
    ]
    , trial_end : Math.floor((new Date().getTime() + TRIAL_INTERVAL) / 1000)
  }).catch(e => { return null });
  if (!subscription) {
    res.status(400).send({
      error : 'Bad request. Subscription cannot created'
    });
    return;
  }
  res.send({
    customer_id : customer_id
  });
});

export default app;
