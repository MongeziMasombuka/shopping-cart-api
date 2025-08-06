import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 🌱 Create mock user
  const mockUser = await prisma.user.upsert({
    where: { email: "mock@example.com" },
    update: {},
    create: {
      email: "mock@example.com",
      name: "Mock User",
    },
  });

  console.log("✅ Mock user created:", mockUser);

  // Optionally seed products here too...
}

main()
  .catch((e) => {
    console.error("❌ Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
