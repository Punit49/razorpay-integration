import { useState, useEffect } from "react";
import {
  ShoppingBag,
  User,
  CreditCard,
} from "lucide-react";
import axios from "axios"

// Fixed user (always Punit Sahu)
const FIXED_USER = {
  _id: "7djshshgs228373738jd",
  name: "Punit Sahu",
  email: "punit.test@example.com",
  phone: "+91 9876543210",
};

// Default 10 products
const INITIAL_PRODUCTS = [
  {
    id: "1",
    name: "Sony WH-1000XM5 Headphones",
    category: "Audio",
    description: "Industry-leading noise canceling with dual processors and 8 microphones for studio clarity.",
    price: 26999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "2",
    name: "Mechanical Gaming Keyboard",
    category: "Gaming",
    description: "Hot-swappable tactile mechanical switches with per-key RGB backlighting and aircraft aluminum frame.",
    price: 4499,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    name: "Logitech MX Master 3S",
    category: "Productivity",
    description: "Precision wireless ergonomic mouse with 8K DPI darkfield sensor and whisper-quiet electromagnetic wheel.",
    price: 8995,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    name: "Ultra Titanium Smartwatch",
    category: "Wearables",
    description: "Rugged smartwatch featuring an ultra-bright AMOLED display, multi-band GPS, and health telemetry.",
    price: 3499,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    name: "4K UHD Action Camera",
    category: "Photography",
    description: "Waterproof action camera with dual high-contrast displays, 6-axis EIS stabilization, and 4K 60FPS.",
    price: 6999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    name: "Minimalist Leather Desk Mat",
    category: "Lifestyle",
    description: "Water-resistant premium dual-sided vegan leather workspace pad for modern desk setups.",
    price: 999,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    name: "65W GaN Fast Charger",
    category: "Accessories",
    description: "Pocket-sized 3-port gallium nitride wall charger with Power Delivery 3.0 for laptops and phones.",
    price: 1499,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "8",
    name: "Studio Condenser USB Mic",
    category: "Audio",
    description: "Cardioid broadcast-grade USB microphone with real-time zero-latency headphone monitoring.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "9",
    name: "20,000mAh PD Power Bank",
    category: "Accessories",
    description: "High capacity power bank with 22.5W fast output, digital LED percentage meter, and dual USB-C.",
    price: 1899,
    image: "https://images.unsplash.com/photo-1609592424364-4e3e3b7fd905?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "10",
    name: "RGB Smart Light Bar Pair",
    category: "Home Tech",
    description: "Ambient backlight lighting system with sound sync, customizable gradients, and desk mount stands.",
    price: 1999,
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
  },
];

export default function App() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const user = FIXED_USER;

  const createOrder = async (Productid) => {
    const response = await axios.post(`http://localhost:3000/api/payments/${Productid}/orders`);
    const data = response.data;

    const rzp = new window.Razorpay({
      key: data.keyId, 
      order_id: data.orderId, 
      amount: data.amount * 100, 
      currency: "INR", 
      name: "Razorpay Demo", 
      description: `Product - ${data.productId}`,

      handler: async (response) => {
        await axios.post(`http://localhost:3000/api/payments/verify`, {
          orderId: response.razorpay_order_id,
          paymentId: response.razorpay_payment_id,
          signature: response.razorpay_signature,
        })
      }
    });

    rzp.open();
  }
 
  // Fetch products from backend if available (fallback to initial)
  useEffect(() => {
    fetch("http://localhost:3000/api/products")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.products?.length > 0) {
          setProducts(
            data.products.map((p) => ({
              id: p._id || p.id,
              name: p.name,
              category: p.category || "General",
              description: p.description,
              price: p.price,
              image: p.image,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);

  const handleBuy = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 antialiased selection:bg-blue-600 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090b]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="font-bold text-lg text-white">RazorPay Store</span>
          </div>
          {/* Fixed user badge */}
          <div className="flex items-center gap-2 bg-zinc-900/90 border border-zinc-800 rounded-full py-1.5 pl-3 pr-2">
            <div className="w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <User className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-zinc-200">{user.name}</div>
              <div className="text-[11px] text-zinc-400">{user.email}</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-10 text-center sm:text-left border-b border-zinc-800/60 pb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Products Catalog</h1>
          <p className="mt-2 text-sm text-zinc-400 max-w-xl">Static user (Punit Sahu) with ID <code className="bg-zinc-800 px-1.5 py-0.5 rounded text-xs">7djshshgs228373738jd</code>.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col transition-all duration-200 shadow-sm hover:shadow-xl">
              <div className="relative aspect-4/3 w-full bg-zinc-950">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" loading="lazy" />
                <span className="absolute top-3 left-3 bg-black/60 text-[11px] text-zinc-300 px-2.5 py-1 rounded-md border border-white/10">{product.category}</span>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <h3 className="font-semibold text-base text-zinc-100 group-hover:text-blue-400 line-clamp-1">{product.name}</h3>
                <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2">{product.description}</p>
                <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-zinc-500">Price</span>
                    <span className="block text-lg font-bold text-white">₹{product.price.toLocaleString("en-IN")}</span>
                  </div>
                  <button onClick={() => createOrder(product.id)} className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500 flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4" />
                    <span>Buy</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Preview modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-2">Razorpay Checkout Preview</h3>
            <p className="text-sm text-zinc-400 mb-4">User: {user.name} (ID: {user._id})</p>
            <p className="text-sm text-zinc-400 mb-2">Product: {selectedProduct.name}</p>
            <p className="text-sm text-white font-bold">Amount: ₹{selectedProduct.price.toLocaleString("en-IN")}</p>
            <button onClick={() => setSelectedProduct(null)} className="mt-4 w-full py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-500">Close</button>
          </div>
        </div>
      )}

      <footer className="mt-20 border-t border-zinc-900 py-6 text-center text-xs text-zinc-600">Clean Dark Mode UI – Fixed User</footer>
    </div>
  );
}
