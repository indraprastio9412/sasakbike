import bikeYellow from "@/assets/bike-yellow.png";
import bikeRed from "@/assets/bike-red.png";
import bikeGreen from "@/assets/bike-green.png";
import bikeBlue from "@/assets/bike-blue.png";

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  color: string;
  features: string[];
};

export const products: Product[] = [
  {
    id: "yellow-strike",
    name: "Mazara Yellow Strike R633",
    tagline: "Sporty • Bold • Energi Matahari",
    price: 2850000,
    image: bikeYellow,
    color: "#f5a524",
    features: ['Frame Alloy Ringan 26"', "Suspensi Depan", "Disc Brake", "21 Speed Shimano"],
  },
  {
    id: "red-blaze",
    name: "Mazara Red Blaze R633",
    tagline: "Berani • Agresif • Penuh Tenaga",
    price: 2950000,
    image: bikeRed,
    color: "#ef4444",
    features: ['Frame Alloy Ringan 26"', "Suspensi Depan", "Disc Brake", "21 Speed Shimano"],
  },
  {
    id: "green-nitro",
    name: "Mazara Green Nitro R633",
    tagline: "Segar • Lincah • Khas Lombok",
    price: 2900000,
    image: bikeGreen,
    color: "#22c55e",
    features: ['Frame Alloy Ringan 26"', "Suspensi Depan", "Disc Brake", "21 Speed Shimano"],
  },
  {
    id: "blue-bolt",
    name: "Mazara Blue Bolt R633",
    tagline: "Tenang • Kuat • Stylish",
    price: 2875000,
    image: bikeBlue,
    color: "#3b82f6",
    features: ['Frame Alloy Ringan 26"', "Suspensi Depan", "Disc Brake", "21 Speed Shimano"],
  },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
