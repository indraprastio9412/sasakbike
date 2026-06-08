/** Data wilayah Indonesia — API Emsifa (berjenjang & gratis) */
const BASE = "https://www.emsifa.com/api-wilayah-indonesia/api";

export type RegionItem = {
  id: string;
  name: string;
};

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error("Gagal memuat data wilayah");
  return res.json() as Promise<T>;
}

export function fetchProvinces() {
  return fetchJson<RegionItem[]>("/provinces.json");
}

export function fetchRegencies(provinceId: string) {
  return fetchJson<RegionItem[]>(`/regencies/${provinceId}.json`);
}

export function fetchDistricts(regencyId: string) {
  return fetchJson<RegionItem[]>(`/districts/${regencyId}.json`);
}

export function fetchVillages(districtId: string) {
  return fetchJson<RegionItem[]>(`/villages/${districtId}.json`);
}

export function formatFullAddress(parts: {
  addressDetail: string;
  village: RegionItem;
  district: RegionItem;
  regency: RegionItem;
  province: RegionItem;
}) {
  const detail = parts.addressDetail.trim();
  const line = `${parts.village.name}, ${parts.district.name}, ${parts.regency.name}, ${parts.province.name}`;
  return detail ? `${detail}, ${line}` : line;
}
