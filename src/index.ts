import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ log: ["info", "query"] });

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
      name: "Manthan Sharma",
      email: "manthan2306s@gmail.com",
    },
  });
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
