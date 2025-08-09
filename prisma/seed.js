import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  {
    name: "Wireless Headphones",
    slug: "wireless-headphones",
    description:
      "Noise-cancelling headphones with deep bass and Bluetooth 5.0 support.",
    price: 59.99,
    quantity: 25,
    category: "Audio",
    rating: 4.5,
    image: "images/product-1.png",
  },
  {
    name: "Bluetooth Speaker",
    slug: "bluetooth-speaker",
    description: "Portable speaker with crisp sound and 12-hour battery life.",
    price: 39.99,
    quantity: 40,
    category: "Audio",
    rating: 4.2,
    image: "images/product-2.png",
  },
  {
    name: "Smartwatch",
    slug: "smartwatch",
    description:
      "Track fitness, receive notifications, and monitor your health stats.",
    price: 99.99,
    quantity: 15,
    category: "Wearables",
    rating: 4.7,
    image: "images/product-3.png",
  },
  {
    name: "Gaming Mouse",
    slug: "gaming-mouse",
    description:
      "Ergonomic mouse with customizable RGB lighting and 6 DPI levels.",
    price: 29.99,
    quantity: 50,
    category: "Accessories",
    rating: 4.3,
    image: "images/product-4.png",
  },
  {
    name: "Mechanical Keyboard",
    slug: "mechanical-keyboard",
    description: "Tactile mechanical keys with a sleek aluminum frame.",
    price: 89.99,
    quantity: 30,
    category: "Accessories",
    rating: 4.8,
    image: "images/product-5.png",
  },
  {
    name: "USB-C Hub",
    slug: "usb-c-hub",
    description: "Multiport adapter with HDMI, USB 3.0, and SD card support.",
    price: 24.99,
    quantity: 100,
    category: "Adapters",
    rating: 4.1,
    image: "images/product-6.png",
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
    console.log(`✅ Inserted: ${product.name}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
