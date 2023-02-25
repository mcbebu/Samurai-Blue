import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const userData = [
    {
        username: "CLIENT",
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
