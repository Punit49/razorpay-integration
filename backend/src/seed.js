import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

export const initialProducts = [
  {
    name: "Sony WH-1000XM5 Headphones",
    description: "Industry-leading noise canceling with two processors and 8 microphones for clear sound.",
    price: 26999,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Mechanical Gaming Keyboard",
    description: "Hot-swappable custom tactile switches with RGB backlighting and aircraft-grade aluminum frame.",
    price: 4499,
    category: "Gaming",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Logitech MX Master 3S",
    description: "Precision wireless ergonomic mouse with 8K DPI sensor and ultra-quiet electromagnetic scroll.",
    price: 8995,
    category: "Productivity",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Ultra Titanium Smartwatch",
    description: "Rugged smartwatch with high-brightness AMOLED display, dual-frequency GPS, and heart sensor.",
    price: 3499,
    category: "Wearables",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "4K UHD Action Camera",
    description: "Waterproof action camera with dual touchscreens, EIS stabilization, and 4K 60FPS video recording.",
    price: 6999,
    category: "Photography",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Minimalist Leather Desk Mat",
    description: "Water-resistant premium dual-sided vegan leather pad designed for clean desktop aesthetics.",
    price: 999,
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "65W GaN Fast Charger",
    description: "Ultra-compact 3-port fast wall charger with Power Delivery for laptops, tablets, and phones.",
    price: 1499,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Studio Condenser USB Mic",
    description: "Cardioid pickup pattern broadcast microphone with zero-latency monitoring and built-in pop filter.",
    price: 2999,
    category: "Audio",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "20,000mAh Power Delivery Bank",
    description: "High capacity portable battery with 22.5W fast charging, LED display, and aircraft safe rating.",
    price: 1899,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1609592424364-4e3e3b7fd905?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "RGB Smart Light Bar Pair",
    description: "Ambient backlight bars with music sync, custom color flow presets, and voice assistant support.",
    price: 1999,
    category: "Home Tech",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
];

export const defaultUser = {
  name: "Punit Sahu",
  email: "punit.test@example.com",
  phone: "+91 9876543210",
};

export const seedDatabase = async () => {
  try {
    await Product.deleteMany({});
    await User.deleteMany({});

    const insertedProducts = await Product.insertMany(initialProducts);
    const insertedUser = await User.create(defaultUser);

    console.log(`✅ Database seeded successfully: ${insertedProducts.length} products, 1 default user.`);
    return { products: insertedProducts, user: insertedUser };
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    throw error;
  }
};

// If run directly (e.g. node src/seed.js)
if (process.argv[1]?.endsWith("seed.js")) {
  await connectDB();
  await seedDatabase();
  process.exit(0);
}

