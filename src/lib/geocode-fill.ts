import {
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  fetchVillages,
  type RegionItem,
} from "@/lib/indonesia-regions";

type NominatimAddress = {
  road?: string;
  hamlet?: string;
  village?: string;
  suburb?: string;
  neighbourhood?: string;
  city_district?: string;
  district?: string;
  city?: string;
  county?: string;
  state?: string;
  postcode?: string;
};

export type GeocodedAddressFill = {
  province: RegionItem;
  regency: RegionItem;
  district: RegionItem;
  village: RegionItem;
  addressDetail: string;
  displayName: string;
};

function normalizeName(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/^(kabupaten|kab\.?|kota administrasi|kota adm\.?|kota|kecamatan|kec\.?|kelurahan|kel\.?|desa)\s+/gi, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function findBestMatch(list: RegionItem[], candidates: string[]): RegionItem | null {
  const normalizedCandidates = candidates.map(normalizeName).filter(Boolean);
  if (!normalizedCandidates.length) return null;

  let best: RegionItem | null = null;
  let bestScore = 0;

  for (const item of list) {
    const itemNorm = normalizeName(item.name);
    for (const cand of normalizedCandidates) {
      if (!cand) continue;
      if (itemNorm === cand) return item;
      if (itemNorm.includes(cand) || cand.includes(itemNorm)) {
        const score = Math.min(itemNorm.length, cand.length);
        if (score > bestScore) {
          bestScore = score;
          best = item;
        }
      }
    }
  }

  return best;
}

function buildAddressDetail(addr: NominatimAddress) {
  const parts = [
    addr.road,
    addr.hamlet,
    addr.neighbourhood,
    addr.postcode ? `Kode pos ${addr.postcode}` : undefined,
  ].filter(Boolean);
  return parts.join(", ") || "Lokasi GPS";
}

async function reverseGeocode(lat: number, lng: number) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1&accept-language=id`,
    { headers: { "Accept-Language": "id" } }
  );
  if (!res.ok) throw new Error("reverse geocode failed");
  return res.json() as Promise<{ display_name?: string; address?: NominatimAddress }>;
}

/** Ambil label lokasi dari koordinat (tanpa isi wilayah). Gagal = null, tidak throw. */
export async function getLocationLabelFromCoordinates(
  lat: number,
  lng: number,
): Promise<string | null> {
  try {
    const geo = await reverseGeocode(lat, lng);
    return geo.display_name ?? `${lat}, ${lng}`;
  } catch {
    return null;
  }
}

/** Isi provinsi → desa dari koordinat GPS */
export async function fillAddressFromCoordinates(lat: number, lng: number): Promise<GeocodedAddressFill> {
  const geo = await reverseGeocode(lat, lng);
  const addr = geo.address ?? {};

  const provinceCandidates = [addr.state].filter(Boolean) as string[];
  const regencyCandidates = [addr.county, addr.city, addr.state].filter(Boolean) as string[];
  const districtCandidates = [addr.district, addr.city_district, addr.suburb].filter(Boolean) as string[];
  const villageCandidates = [addr.village, addr.suburb, addr.hamlet, addr.neighbourhood].filter(Boolean) as string[];

  const allProvinces = await fetchProvinces();
  const matchedProvince = findBestMatch(allProvinces, provinceCandidates);
  if (!matchedProvince) {
    throw new Error("Provinsi tidak ditemukan dari lokasi GPS");
  }

  const allRegencies = await fetchRegencies(matchedProvince.id);
  const matchedRegency = findBestMatch(allRegencies, regencyCandidates);
  if (!matchedRegency) {
    throw new Error("Kabupaten/Kota tidak ditemukan dari lokasi GPS");
  }

  const allDistricts = await fetchDistricts(matchedRegency.id);
  const matchedDistrict = findBestMatch(allDistricts, districtCandidates);
  if (!matchedDistrict) {
    throw new Error("Kecamatan tidak ditemukan dari lokasi GPS");
  }

  const allVillages = await fetchVillages(matchedDistrict.id);
  let matchedVillage = findBestMatch(allVillages, villageCandidates);
  if (!matchedVillage && allVillages.length > 0) {
    matchedVillage = allVillages[0];
  }
  if (!matchedVillage) {
    throw new Error("Kelurahan/Desa tidak ditemukan dari lokasi GPS");
  }

  return {
    province: matchedProvince,
    regency: matchedRegency,
    district: matchedDistrict,
    village: matchedVillage,
    addressDetail: buildAddressDetail(addr),
    displayName: geo.display_name ?? `${lat}, ${lng}`,
  };
}
