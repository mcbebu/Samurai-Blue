require("dotenv").config();
const bodyParser = require("body-parser");
const { resolve } = require("path");
const session = require("express-session");
const uuidv4 = require("uuid").v4;
const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Prisma } = require("@prisma/client");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(express.static("public"));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

const YOUR_DOMAIN = "http://localhost:4242";

const port = process.env.PORT || 4242;

const streamRouter = require("./routes/stream.js");
app.use("/stream", streamRouter);

app.use(express.static(process.env.STATIC_DIR + "/"));
app.use(
    session({
        secret: uuidv4(),
        resave: false,
        saveUninitialized: true,
    })
);

app.get("/username/:username", async (req, res) => {
    // const response = concerts[req.params.id];
    // if (response === undefined) {
    //     res.status(404).send();
    // }
    // console.log(response);
    // res.end(JSON.stringify(response));
    const { username } = req.params;

    const user = await prisma.user.findUnique({
        where: { username: username },
    });
    console.log(user);
    res.json(user);
});

app.get("/products", async (req, res) => {
    const product = await prisma.product.findMany();
    console.log(product);
    res.json(product);
});

app.get("/orders", async (req, res) => {
    const order = await prisma.orders.findMany();
    console.log(order);
    res.json(order);
});

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});

app.get("/get-oauth-link", async (req, res) => {
    const state = uuidv4();
    req.session.state = state;
    const args = new URLSearchParams({
        state,
        client_id: process.env.STRIPE_CLIENT_ID,
        scope: "read_write",
        response_type: "code",
    });
    const url = `https://connect.stripe.com/oauth/authorize?${args.toString()}`;
    return res.send({ url });
});

app.get("/authorize-oauth", async (req, res) => {
    const { code, state } = req.query;

    // Assert the state matches the state you provided in the OAuth link (optional).
    if (req.session.state !== state) {
        return res
            .status(403)
            .json({ error: "Incorrect state parameter: " + state });
    }

    // Send the authorization code to Stripe's API.
    stripe.oauth
        .token({
            grant_type: "authorization_code",
            code,
        })
        .then(
            (response) => {
                var connected_account_id = response.stripe_user_id;
                saveAccountId(connected_account_id);

                // Render some HTML or redirect to a different page.
                return res.redirect(301, "/success.html");
            },
            (err) => {
                if (err.type === "StripeInvalidGrantError") {
                    return res
                        .status(400)
                        .json({ error: "Invalid authorization code: " + code });
                } else {
                    return res
                        .status(500)
                        .json({ error: "An unknown error occurred." });
                }
            }
        );
});

const saveAccountId = (id) => {
    // Save the connected account ID from the response to your database.
    console.log("Connected account ID: " + id);
};

app.post("/onboard-user", async (req, res) => {
    try {
        const account = await stripe.accounts.create({
            type: "standard",
        });

        // Store the ID of the new Standard connected account.
        req.session.accountID = account.id;

        const origin = `${req.headers.origin}`;
        const accountLink = await stripe.accountLinks.create({
            type: "account_onboarding",
            account: account.id,
            refresh_url: `${origin}/onboard-user/refresh`,
            return_url: `${origin}`,
        });

        res.end(JSON.stringify({ url: `${accountLink.url}` }));
    } catch (err) {
        res.status(500).send({
            error: err.message,
        });
    }
});

app.get("/onboard-user/refresh", async (req, res) => {
    if (!req.session.accountID) {
        res.redirect("/");
        return;
    }

    try {
        const { accountID } = req.session;
        const origin = `${req.secure ? "https://" : "http://"}${
            req.headers.host
        }`;

        const accountLink = await stripe.accountLinks.create({
            type: "account_onboarding",
            account: accountID,
            refresh_url: `${origin}/onboard-user/refresh`,
            return_url: `${origin}`,
        });

        res.redirect(303, accountLink.url);
    } catch (err) {
        res.status(500).send({
            error: err.message,
        });
    }
});

// create order, get the order id
// find the name, price by product code
// with order id, name, price and qty, create checkout
// i need username, platform, session name, product code, quantity
// Creating prebuilt stripe checkout, product defined on the fly
app.post("/create-checkout-session", express.json(), async (req, res) => {
    // find product
    const product = await prisma.product.findUnique({
        where: { product_code: req.body.product_code },
    });

    // create order
    const order = await prisma.orders.create({
        data: {
            username: req.body.username,
            platform: req.body.platform,
            productId: product.id,
            status: "Checkout link sent",
            sessionName: req.body.sessionname,
        },
    });
    // console.log(product);
    // console.log(order);
    // console.log(req.body);

    // create link
    // add custom fields
    const session = await stripe.checkout.sessions.create(
        {
            line_items: [
                {
                    quantity: req.body.quantity,
                    price_data: {
                        currency: "sgd",
                        unit_amount: product.price,
                        tax_behavior: "inclusive",
                        product_data: {
                            name: product.name,
                            tax_code: "txcd_10000000",
                        },
                    },
                },
            ],
            payment_method_types: ["card", "paynow"],
            mode: "payment",
            success_url: `${YOUR_DOMAIN}?success=true`,
            cancel_url: `${YOUR_DOMAIN}?canceled=true`,
            automatic_tax: { enabled: true },
            metadata: {
                orderid: order.id,
            },
            customer_creation: "if_required",
        },
        { stripeAccount: "acct_1MfJkwJVJJeB1km6" }
    );
    // call martin endpoint to send message
    res.end(JSON.stringify({ url: `${session.url}` }));
});

const endpointSecret =
    "whsec_0a1aafb35a8e08c9f154e54ead53d42f682348db0796a0379c9658a868ec57e0";

// update order to completed
//
app.post(
    "/webhook",
    express.raw({ type: "application/json" }),
    (request, response) => {
        const sig = request.headers["stripe-signature"];

        let event;

        try {
            // request.body param takes in buffer instead of parsed data, so must use raw middleware and cant define globally
            event = stripe.webhooks.constructEvent(
                request.body,
                sig,
                endpointSecret
            );
            console.log("event success");
        } catch (err) {
            response.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case "payment_intent.succeeded":
                const paymentIntentSucceeded = event.data.object;
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            case "checkout.session.completed":
                console.log(event.data.object.metadata);

                break;
            case "checkout.session.async_payment_succeeded":
                console.log(event.data.object.metadata);

                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        response.send();
    }
);

app.listen(4242, () => console.log("Running on port 4242"));
