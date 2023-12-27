import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({ log: ["info", "query"] })

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.todo.create({
    data:{
        "title":"have Lunch",
        "description":"Have lunch by 2",
        userId:1
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })