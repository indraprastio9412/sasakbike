/** Link Google Maps lokasi toko Sasak Bike */
export const STORE_MAPS_URL = "https://maps.app.goo.gl/s5C63QvrcnyuJx9f8";

/** Koordinat lokasi (dari link di atas) */
export const STORE_MAPS_COORDS = {
  lat: -8.588078,
  lng: 116.34662,
} as const;

const { lat, lng } = STORE_MAPS_COORDS;
const bboxPad = 0.012;

/** Embed peta untuk halaman lokasi (OpenStreetMap — stabil tanpa API key) */
export const STORE_MAPS_EMBED_URL =
  `https://www.openstreetmap.org/export/embed.html?bbox=${lng - bboxPad},${lat - bboxPad},${lng + bboxPad},${lat + bboxPad}&layer=mapnik&marker=${lat},${lng}`;
