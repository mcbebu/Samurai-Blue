import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData = [
    {
        username: "CLIENT",
        stripeAccount: "",
        from_name: "",
        from_phone_number: "",
        from_email: "",
        from_address_postcode: "",
        from_address_address1: "",
        from_address_country: "",
        paynow: false,
        creditcard: false,
    },
    {
        username: "CLIENT1",
        stripeAccount: "acct_1MfJkwJVJJeB1km6",
        from_name: "CLIENT1",
        from_phone_number: "98765432",
        from_email: "client1@gmail.com",
        from_address_postcode: "248923",
        from_address_address1: "3 Kay Siang Rd",
        from_address_country: "SG",
        paynow: true,
        creditcard: true,
    },
];

const sessionData = [
    {
        name: "S1",
    },
];

const productData = [
    {
        name: "Blueberry",
        product_code: "BLUEM",
        quantity: 10,
        price: 1000,
        weightInGrams: 100,
        SKU: "1234",
        imageurl:
            "https://www.ninjavan.co/static/8e42d7a6177eee2281bf94c9369ffca4/26e8b/desktop.jpg",
        Orders: {
            create: [
                {
                    username: "fb_1",
                    platform: "FB",
                    status: "Checkout Link Sent",
                    sessionName: "S1",
                },
                {
                    username: "fb_2",
                    platform: "FB",
                    status: "Checkout Link Sent",
                    sessionName: "S1",
                },
                {
                    username: "fb_3",
                    platform: "FB",
                    status: "Checkout Completed, Please ship customer order",
                    sessionName: "S1",
                },
            ],
        },
    },
    {
        name: "Coconut",
        product_code: "COCO",
        quantity: 10,
        price: 500,
        weightInGrams: 100,
        SKU: "1234",
        imageurl:
            "https://www.ninjavan.co/static/8e42d7a6177eee2281bf94c9369ffca4/26e8b/desktop.jpg",
    },
    {
        name: "Hotplate",
        product_code: "HOTTIE",
        quantity: 10,
        price: 10000,
        weightInGrams: 100,
        SKU: "1234",
        imageurl:
            "https://www.ninjavan.co/static/8e42d7a6177eee2281bf94c9369ffca4/26e8b/desktop.jpg",
    },
    {
        name: "Football",
        product_code: "FBPORT",
        quantity: 10,
        price: 1000,
        weightInGrams: 100,
        SKU: "1234",
        imageurl:
            "https://www.ninjavan.co/static/8e42d7a6177eee2281bf94c9369ffca4/26e8b/desktop.jpg",
    },
];

async function main() {
    console.log("Start seeing...");
    for (const u of userData) {
        const user = await prisma.user.create({
            data: u,
        });
        console.log(`Created user with id: ${user.id}`);
    }
    for (const s of sessionData) {
        const session = await prisma.session.create({
            data: s,
        });
        console.log(`Created session with name: ${session.name}`);
    }
    for (const p of productData) {
        const user = await prisma.product.create({
            data: p,
        });
        console.log(`Created product with id: ${user.id}`);
    }
    console.log("Seeding finished");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
