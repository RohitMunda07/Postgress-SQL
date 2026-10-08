import prisma from "../config/prisma.js"

const main = async () => {
    try {
        const users = await prisma.user.findMany();

        console.log("User Fetch using Prisma", users)

    } catch (error) {
        console.log("Error Fetching users from prisma", error);

    } finally {
        await prisma.$disconnect();
    }
}

main()