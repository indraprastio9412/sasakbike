import bikeYellow from "@/assets/bike-yellow.png";
import bikeRed from "@/assets/bike-red.png";
import bikeGreen from "@/assets/bike-green.png";
import bikeBlue from "@/assets/bike-blue.png";
import maximusRed from "@/assets/maximus-red.png";
import maximusBlack from "@/assets/maximus-black.png";
import maximusBlackBlue from "@/assets/maximus-black-blue.png";
import maximusBlue from "@/assets/maximus-blue.png";
import mazara9933Ungu from "@/assets/mazara-9933-ungu.png";
import mazara9933PinkUngu from "@/assets/mazara-9933-pink-ungu.png";
import mazara9933Pink from "@/assets/mazara-9933-pink.png";
import mazara9933PinkMagenta from "@/assets/mazara-9933-pink-magenta.png";
import roletBigoHitamMerahTosca from "@/assets/rolet-bigo-hitam-merah-tosca.png";
import roletBigoHitamTosca from "@/assets/rolet-bigo-hitam-tosca.png";
import roletBigoHitamBiruHijau from "@/assets/rolet-bigo-hitam-biru-hijau.png";
import familyF918Spongebob from "@/assets/family-f918-spongebob.png";
import familyF918Merah from "@/assets/family-f918-merah.png";
import familyF918Nella from "@/assets/family-f918-nella.png";
import vortec9002Merah from "@/assets/vortec-9002-merah.png";
import vortec9002Oren from "@/assets/vortec-9002-oren.png";
import vortec9002Biru from "@/assets/vortec-9002-biru.png";

export type ProductVariant = {
  id: string;
  label: string;
  color: string;
  image: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductCategoryId =
  | "semua"
  | "anak-anak"
  | "dewasa"
  | "bmx"
  | "roda-tiga"
  | "city-bike";

export type ProductCategory = {
  id: ProductCategoryId;
  label: string;
  description: string;
};

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  { id: "semua", label: "Semua Produk", description: "Seluruh koleksi sepeda Sasak Bike" },
  { id: "anak-anak", label: "Sepeda Anak-Anak", description: "Sepeda untuk balita, anak, dan remaja" },
  { id: "dewasa", label: "Sepeda Dewasa", description: "Sepeda ukuran dewasa, tangguh dan nyaman" },
  { id: "bmx", label: "BMX", description: "Sepeda BMX freestyle untuk anak dan remaja" },
  { id: "roda-tiga", label: "Sepeda Roda Tiga", description: "Sepeda roda tiga aman untuk balita" },
  { id: "city-bike", label: "City Bike", description: "Sepeda keranjang / city bike praktis" },
];

export type Product = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  image: string;
  color: string;
  variants: ProductVariant[];
  specs: ProductSpec[];
  sizes: string[];
  categories: Exclude<ProductCategoryId, "semua">[];
  searchKeywords?: string[];
};

export const EMPTY_PRODUCT_SLOTS = 0;

const mazaraSpecs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru" },
  { label: "Keaslian", value: "Original 100%" },
  { label: "Merk", value: "MAZARA (by Pacific Bike)" },
  { label: "Produksi", value: "PT Roda Pasifik Mandiri (Pacific Group)" },
  { label: "Tipe", value: "6633" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI)" },
  { label: "Frame", value: "Steel Frame" },
  { label: "Fork", value: "Steel Fork" },
  { label: "FD", value: "3 Speed" },
  { label: "RD", value: "7 Speed" },
  { label: "Rem", value: "Rem Cakram Mekanik" },
  { label: "Velg", value: "Alloy Double Wall" },
  {
    label: "Beban Maksimal",
    value: "100 Kg (Untuk tipe 6633 dewasa, beban maksimal standar hingga 100 kg)",
  },
];

const mazara9933Specs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru" },
  { label: "Keaslian", value: "Original 100%" },
  { label: "Merk", value: "MAZARA (by Pacific Bike)" },
  { label: "Produksi", value: "PT Roda Pasifik Mandiri (Pacific Group)" },
  { label: "Tipe", value: "9933TH (Sepeda Keranjang / City Bike / CTB)" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI)" },
  { label: "Pengguna", value: "Anak Perempuan / Remaja (Usia 8–12 Tahun)" },
  { label: "Ukuran Ban", value: "20 Inci" },
  { label: "Frame", value: "Hi-Ten Steel CTB Frame" },
  { label: "Fork", value: "Hi-Ten Steel CTB Fork" },
  { label: "Sistem Kecepatan", value: "Single Speed" },
  { label: "Sistem Rem", value: "Rem Depan Caliper & Rem Belakang Tromol" },
  {
    label: "Pelindung Rantai",
    value: "Katengkas / Cover Rantai Penuh (Mencegah rok, baju, atau kaki anak tersangkut rantai)",
  },
  {
    label: "Aksesoris Bawaan",
    value: "Keranjang Besi Depan, Spakbor, Boncengan Belakang + Lapisan Busa Empuk, serta Standar Samping",
  },
];

const roletBigoSpecs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru (Original 100%)" },
  { label: "Merk", value: "ROLET" },
  { label: "Tipe", value: "BIGO 3.0" },
  { label: "Kategori", value: "Sepeda BMX Anak Laki-Laki" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI)" },
  { label: "Ukuran Roda", value: "16 Inch" },
  { label: "Material Frame", value: "Steel Frame / Hi-Ten Steel (Besi Tebal & Kuat khas BMX)" },
  { label: "Ukuran Ban", value: "3.0 Jumbo (Ban pompa ukuran lebar ekstra)" },
  { label: "Sistem Rem", value: "V-Brake Depan & Belakang" },
  {
    label: "Aksesoris Fitur Utama",
    value: "Tebeng Tameng Depan dilengkapi Musik + Lampu",
  },
  {
    label: "Fitur Pendukung",
    value:
      "Roda bantu samping kanan-kiri yang dilengkapi lampu menyala saat berputar (Roda Samping Lampu). Desain stang dilengkapi tanduk tambahan bergaya sporty. Dilengkapi spakbor depan dan belakang bergaya motor balap. Menggunakan stiker air (water decal) yang menyatu dengan cat, tidak mudah mengelupas.",
  },
];

const familyF918SpongebobSpecs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru" },
  { label: "Keaslian", value: "Original 100% (Garansi Resmi)" },
  { label: "Merk", value: "FAMILY (Edisi Resmi Berlisensi Nickelodeon Spongebob Squarepants)" },
  { label: "Produksi", value: "PT Jakarta Tunggal Citra (Made in Indonesia)" },
  { label: "Tipe", value: "F-918 Series" },
  { label: "Kategori", value: "Sepeda Roda Tiga Anak (Baby Tricycle)" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI) & Top Brand Kids" },
  { label: "Pengguna", value: "Balita / Anak Usia 1–3 Tahun (Beban Maksimum 25 Kg)" },
  {
    label: "Material Frame",
    value: "Chrome Frame (Rangka besi lapis krom mengkilap, kokoh, dan tahan karat)",
  },
  {
    label: "Material Roda",
    value: "Roda Karet Asli (Lebih empuk, tidak bising di ubin, dan mencengkeram jalan dengan baik)",
  },
  {
    label: "Parent Control / Steering Rod",
    value: "Tongkat dorongan kemudi di belakang untuk kendali penuh orang tua",
  },
  {
    label: "Safety Guard / Armrest",
    value:
      "Lingkaran pengaman berlapis busa empuk untuk menjaga balita agar tidak merosot jatuh",
  },
  {
    label: "Fitur Pendukung",
    value:
      "Tebeng Tameng Depan dengan Grafik Karakter Resmi Spongebob Squarepants. Tatakan / Pijakan Kaki Tengah (Dapat dilipat jika anak sudah mulai belajar mengayuh sendiri). Dilengkapi Spakbor roda depan dan bel pencet plastik",
  },
];

const vortec9002Specs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru (Original 100%)" },
  { label: "Merk", value: "VORTEC (Lini Impor Ekonomis)" },
  { label: "Tipe", value: "9002 (Sepeda BMX Anak)" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI)" },
  { label: "Ukuran Roda", value: "16 Inch" },
  { label: "Rangka (Frame)", value: "Hi-Ten Steel (Besi Baja Kuat & Kokoh)" },
  { label: "Rem", value: "V-Brake Depan & Belakang" },
  { label: "Ban", value: "Ukuran 3.0 Jumbo (Ekstra Lebar & Stabil)" },
  { label: "Fitur Utama", value: "Tameng Musik + Lampu di Stang Depan" },
  {
    label: "Aksesoris",
    value: "Roda Bantu Samping, Penutup Rantai Penuh, dan Spakbor Sporty",
  },
];

const maximusSpecs: ProductSpec[] = [
  { label: "Status", value: "READY STOK" },
  { label: "Kondisi", value: "Barang Baru" },
  { label: "Keaslian", value: "Original 100%" },
  { label: "Merk", value: "MAXIMUS (by Pacific Bike)" },
  { label: "Produksi", value: "PT Roda Pasifik Mandiri (Pacific Group)" },
  { label: "Tipe", value: "Altarra 3321-1 (Sepeda BMX Anak)" },
  { label: "Sertifikasi", value: "Standar Nasional Indonesia (SNI)" },
  { label: "Pengguna", value: "Anak-anak / Remaja (Usia 5–8 Tahun)" },
  { label: "Frame", value: 'Hi-Ten Steel 20" (Besi Baja Kuat)' },
  { label: "Fork", value: '20" BMX Steel Fork' },
  { label: "Sistem Rem", value: "Steel V-Brakes (Depan & Belakang)" },
  { label: "Velg", value: "Maximus New Steel Rims W: 37mm" },
  { label: "Ukuran Ban", value: '20" x 2.40 ' },
  { label: "Sadel & Pedal", value: "Original Maximus New Design" },
  { label: "Dimensi Produk", value: "100 x 20 x 50 cm" },
  { label: "Berat Produk", value: "15 Kg" },
  {
    label: "Beban Maksimal",
    value: "60 Kg (Dirancang aman menahan bobot aktif anak-anak)",
  },
];

export const products: Product[] = [
  {
    id: "mazara-r633",
    name: "Mazara R633",
    tagline: "Sporty • Kuat • Khas Lombok",
    price: 1500000,
    image: bikeYellow,
    color: "#f5a524",
    sizes: ["24", "26"],
    categories: ["dewasa"],
    searchKeywords: ["sepeda dewasa", "mtb", "mazara", "pacific", "6633"],
    specs: mazaraSpecs,
    variants: [
      { id: "yellow", label: "Yellow Strike", color: "#f5a524", image: bikeYellow },
      { id: "red", label: "Red Blaze", color: "#ef4444", image: bikeRed },
      { id: "green", label: "Green Nitro", color: "#22c55e", image: bikeGreen },
      { id: "blue", label: "Blue Bolt", color: "#3b82f6", image: bikeBlue },
    ],
  },
  {
    id: "maximus-altarra-3321",
    name: "Maximus Altarra 3321-1",
    tagline: "BMX • Freestyle • 20 Inch",
    price: 1000000,
    image: maximusRed,
    color: "#ef4444",
    sizes: ["20"],
    categories: ["anak-anak", "bmx"],
    searchKeywords: ["sepeda anak anak", "bmx anak", "maximus", "remaja"],
    specs: maximusSpecs,
    variants: [
      { id: "red", label: "Merah", color: "#ef4444", image: maximusRed },
      { id: "black-red", label: "Hitam Merah", color: "#ef4444", image: maximusBlack },
      { id: "black-white", label: "Hitam Putih", color: "#e5e7eb", image: maximusBlackBlue },
      { id: "blue", label: "Biru", color: "#2563eb", image: maximusBlue },
    ],
  },
  {
    id: "mazara-9933th",
    name: "Mazara 9933TH",
    tagline: "CTB • City Bike • Sepeda Keranjang",
    price: 1400000,
    image: mazara9933Ungu,
    color: "#9333ea",
    sizes: ["20"],
    categories: ["anak-anak", "city-bike"],
    searchKeywords: ["sepeda anak perempuan", "sepeda keranjang", "city bike anak", "ctb"],
    specs: mazara9933Specs,
    variants: [
      { id: "ungu", label: "Ungu", color: "#9333ea", image: mazara9933Ungu },
      { id: "pink-ungu", label: "Pink Ungu", color: "#c026d3", image: mazara9933PinkUngu },
      { id: "merah", label: "Merah", color: "#ef4444", image: mazara9933Pink },
      { id: "pink", label: "Pink", color: "#ec4899", image: mazara9933PinkMagenta },
    ],
  },
  {
    id: "rolet-bigo-3",
    name: "Rolet BIGO 3.0",
    tagline: "BMX • Anak Laki-Laki • 16 Inch",
    price: 900000,
    image: roletBigoHitamMerahTosca,
    color: "#ef4444",
    sizes: ["16"],
    categories: ["anak-anak", "bmx"],
    searchKeywords: ["sepeda anak laki laki", "bmx 16 inch", "rolet bigo"],
    specs: roletBigoSpecs,
    variants: [
      {
        id: "hitam-merah-tosca",
        label: "Hitam Merah Tosca",
        color: "#14b8a6",
        image: roletBigoHitamMerahTosca,
      },
      {
        id: "hitam-tosca",
        label: "Hitam Tosca",
        color: "#06b6d4",
        image: roletBigoHitamTosca,
      },
      {
        id: "hitam-biru-hijau",
        label: "Hitam Biru Hijau",
        color: "#22c55e",
        image: roletBigoHitamBiruHijau,
      },
    ],
  },
  {
    id: "family-f918-spongebob",
    name: "Sepeda Roda Tiga Anak Family F-918 Spongebob Squarepants Series",
    tagline: "Baby Tricycle • SNI • Usia 1–3 Tahun",
    price: 700000,
    image: familyF918Spongebob,
    color: "#3b82f6",
    sizes: [],
    categories: ["anak-anak", "roda-tiga"],
    searchKeywords: ["sepeda roda tiga", "sepeda balita", "tricycle", "spongebob", "family"],
    specs: familyF918SpongebobSpecs,
    variants: [
      {
        id: "spongebob",
        label: "Biru",
        color: "#3b82f6",
        image: familyF918Spongebob,
      },
      {
        id: "merah",
        label: "Merah",
        color: "#ef4444",
        image: familyF918Merah,
      },
      {
        id: "nella",
        label: "Pink",
        color: "#ec4899",
        image: familyF918Nella,
      },
    ],
  },
  {
    id: "vortec-9002-bmx",
    name: "Vortec 9002 BMX Series",
    tagline: "BMX • 16 Inch • SNI",
    price: 1000000,
    image: vortec9002Merah,
    color: "#ef4444",
    sizes: ["16"],
    categories: ["anak-anak", "bmx"],
    searchKeywords: ["sepeda anak anak", "bmx anak", "vortec 9002"],
    specs: vortec9002Specs,
    variants: [
      {
        id: "merah",
        label: "Merah",
        color: "#ef4444",
        image: vortec9002Merah,
      },
      {
        id: "oren",
        label: "Oren",
        color: "#f97316",
        image: vortec9002Oren,
      },
      {
        id: "biru",
        label: "Biru",
        color: "#3b82f6",
        image: vortec9002Biru,
      },
    ],
  },
];

export const formatRupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
