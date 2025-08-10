import prisma from "../lib/prisma";

async function main() {
  await prisma.book.createMany({
    data: [
      { title: "Book One", author: "Author A", genre: "Fiction" },
      { title: "Book Two", author: "Author B", genre: "Non-fiction" }
    ]
  });
  console.log("✅ Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
