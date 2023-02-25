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
    // const response = concerts[req.params.id];
    // if (response === undefined) {
    //     res.status(404).send();
    // }
    // console.log(response);
    // res.end(JSON.stringify(response));

    const product = await prisma.product.findMany();
    console.log(product);
    res.json(product);
});

// Use JSON parser for all non-webhook routes
app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next();
    } else {
        bodyParser.json()(req, res, next);
    }
});
console.log(process.env.STATIC_DIR);

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

// Creating prebuilt stripe checkout, product defined on the fly
app.post("/create-checkout-session", express.json(), async (req, res) => {
    // can add the specific tickets that were assigned in the metadata
    console.log(req.body);
    const session = await stripe.checkout.sessions.create(
        {
            line_items: [
                {
                    quantity: req.body.quantity,
                    price_data: {
                        currency: "sgd",
                        unit_amount: req.body.price,
                        tax_behavior: "inclusive",
                        product_data: {
                            name: req.body.name,
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
                orderid: req.body.orderid,
            },
            customer_creation: "if_required",
        },
        { stripeAccount: "acct_1MfJkwJVJJeB1km6" }
    );
    res.end(JSON.stringify({ url: `${session.url}` }));
});

app.listen(4242, () => console.log("Running on port 4242"));
