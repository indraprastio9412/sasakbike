import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import {
  MapPin,
  Loader2,
  ShieldCheck,
  BadgeCheck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";
import RegionSearchSelect from "@/components/RegionSearchSelect";
import {
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  fetchVillages,
  formatFullAddress,
  type RegionItem,
} from "@/lib/indonesia-regions";
import { getLocationLabelFromCoordinates } from "@/lib/geocode-fill";

export const WhatsAppIcon = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
    viewBox="0 0 32 32"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.493-1.318.13-.302.158-.49.158-.79 0-.17 0-.43-.13-.524-.143-.143-.6-.286-.973-.43z" />
    <path d="M16.013 0h-.027C7.176 0 0 7.176 0 15.987c0 3.503 1.13 6.745 3.043 9.385L1.054 31.31l5.94-1.9c2.553 1.69 5.604 2.677 8.998 2.677 8.812 0 15.987-7.176 15.987-15.987C32 7.176 24.825 0 16.013 0zm0 28.494c-3.073 0-5.93-.927-8.318-2.515l-5.81 1.86 1.886-5.617c-1.748-2.474-2.78-5.49-2.78-8.737C.99 7.728 7.728 1 16.013 1S31.01 7.728 31.01 16.013c0 8.286-6.737 15.014-14.997 15.014z" />
  </svg>
);

export type BuyerOrderPayload = {
  name: string;
  phone: string;
  fullAddress: string;
  province: RegionItem;
  regency: RegionItem;
  district: RegionItem;
  village: RegionItem;
  addressDetail: string;
  coords: { lat: number; lng: number } | null;
  mapsLink: string | null;
  mapsLabel: string | null;
};

type BuyerOrderFormProps = {
  onSubmit: (data: BuyerOrderPayload) => void | Promise<void>;
  submitting?: boolean;
  /** Sembunyikan tombol submit di mobile — pakai tombol sticky di halaman produk */
  hideSubmitOnMobile?: boolean;
  submitLabel?: string;
};

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Nama lengkap wajib diisi")
    .min(3, "Nama minimal 3 karakter")
    .max(100),
  phone: z
    .string()
    .trim()
    .regex(
      /^08\d{10}$/,
      "Nomor WhatsApp harus 12 angka dan diawali 08 (contoh: 081234567890)",
    ),
  addressDetail: z
    .string()
    .trim()
    .min(1, "Detail alamat/patokan wajib diisi")
    .min(5, "Detail alamat/patokan minimal 5 karakter")
    .max(300),
  province: z.object({ id: z.string(), name: z.string() }),
  regency: z.object({ id: z.string(), name: z.string() }),
  district: z.object({ id: z.string(), name: z.string() }),
  village: z.object({ id: z.string(), name: z.string() }),
});

const BuyerOrderForm = ({
  onSubmit,
  submitting,
  hideSubmitOnMobile = false,
  submitLabel = "Kirim Pesanan via WhatsApp",
}: BuyerOrderFormProps) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [province, setProvince] = useState<RegionItem | null>(null);
  const [regency, setRegency] = useState<RegionItem | null>(null);
  const [district, setDistrict] = useState<RegionItem | null>(null);
  const [village, setVillage] = useState<RegionItem | null>(null);

  const [provinces, setProvinces] = useState<RegionItem[]>([]);
  const [regencies, setRegencies] = useState<RegionItem[]>([]);
  const [districts, setDistricts] = useState<RegionItem[]>([]);
  const [villages, setVillages] = useState<RegionItem[]>([]);

  const [loadingProvinces, setLoadingProvinces] = useState(true);
  const [loadingRegencies, setLoadingRegencies] = useState(false);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [loadingVillages, setLoadingVillages] = useState(false);

  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [mapsLabel, setMapsLabel] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);
  const [gpsVerified, setGpsVerified] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const isAutoFilling = useRef(false);

  useEffect(() => {
    fetchProvinces()
      .then(setProvinces)
      .catch(() => toast.error("Gagal memuat data provinsi"))
      .finally(() => setLoadingProvinces(false));
  }, []);

  useEffect(() => {
    if (!province) {
      setRegencies([]);
      if (!isAutoFilling.current) setRegency(null);
      return;
    }
    setLoadingRegencies(true);
    if (!isAutoFilling.current) {
      setRegency(null);
      setDistrict(null);
      setVillage(null);
      setDistricts([]);
      setVillages([]);
    }
    fetchRegencies(province.id)
      .then(setRegencies)
      .catch(() => toast.error("Gagal memuat kabupaten/kota"))
      .finally(() => setLoadingRegencies(false));
  }, [province?.id]);

  useEffect(() => {
    if (!regency) {
      setDistricts([]);
      if (!isAutoFilling.current) setDistrict(null);
      return;
    }
    setLoadingDistricts(true);
    if (!isAutoFilling.current) {
      setDistrict(null);
      setVillage(null);
      setVillages([]);
    }
    fetchDistricts(regency.id)
      .then(setDistricts)
      .catch(() => toast.error("Gagal memuat kecamatan"))
      .finally(() => setLoadingDistricts(false));
  }, [regency?.id]);

  useEffect(() => {
    if (!district) {
      setVillages([]);
      if (!isAutoFilling.current) setVillage(null);
      return;
    }
    setLoadingVillages(true);
    if (!isAutoFilling.current) setVillage(null);
    fetchVillages(district.id)
      .then(setVillages)
      .catch(() => toast.error("Gagal memuat kelurahan/desa"))
      .finally(() => setLoadingVillages(false));
  }, [district?.id]);

  const mapsLink = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}`
    : null;

  const detectLocation = () => {
    if (!navigator.geolocation) {
      return toast.error("GPS tidak didukung browser ini");
    }

    setLocating(true);
    setGpsVerified(false);
    setCoords(null);
    setMapsLabel(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        setGpsVerified(true);
        setLocating(false);
        toast.success("Lokasi berhasil ditemukan!");

        const label = await getLocationLabelFromCoordinates(lat, lng);
        if (label) setMapsLabel(label);
      },
      () => {
        setLocating(false);
        setGpsVerified(false);
        toast.error(
          "Izin lokasi ditolak. Aktifkan GPS di pengaturan perangkat.",
        );
      },
      { enableHighAccuracy: true, timeout: 15000 },
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};

    // GPS bersifat opsional. Jika pengguna tidak pakai GPS, user masih bisa isi alamat manual.
    if (!name.trim()) errs.name = "Nama lengkap wajib diisi";
    if (!phone.trim()) {
      errs.phone = "Nomor WhatsApp wajib diisi";
    } else if (phone.length !== 12) {
      errs.phone = "Nomor WhatsApp harus tepat 12 angka (contoh: 081234567890)";
    } else if (!phone.startsWith("08")) {
      errs.phone = "Nomor WhatsApp harus diawali 08";
    }

    if (!province) errs.province = "Provinsi wajib diisi";
    if (!regency) errs.regency = "Kabupaten/kota wajib diisi";
    if (!district) errs.district = "Kecamatan wajib diisi";
    if (!village) errs.village = "Kelurahan/desa wajib diisi";
    if (!addressDetail.trim())
      errs.addressDetail = "Detail alamat/patokan wajib diisi";

    const result = schema.safeParse({
      name,
      phone,
      addressDetail,
      province,
      regency,
      district,
      village,
    });

    if (!result.success) {
      result.error.issues.forEach((i) => {
        const key = String(i.path[0]);
        errs[key] = i.message;
      });
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      toast.error("Lengkapi semua data pemesanan dengan benar");
      return;
    }

    setErrors({});
    await onSubmit({
      name: result.data!.name,
      phone: result.data!.phone,
      addressDetail: result.data!.addressDetail,
      province: province!,
      regency: regency!,
      district: district!,
      village: village!,
      fullAddress: formatFullAddress({
        addressDetail: result.data!.addressDetail,
        province: province!,
        regency: regency!,
        district: district!,
        village: village!,
      }),
      coords,
      mapsLink,
      mapsLabel,
    });
  };

  return (
    <form
      id="buyer-order-form"
      onSubmit={handleSubmit}
      className="space-y-4 pt-4 border-t border-border"
    >
      <h3 className="font-display font-bold text-sm sm:text-base flex items-center gap-2">
        <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
        Data Pembeli
      </h3>

      <div>
        <label className="text-xs font-semibold text-muted-foreground">
          Nama Lengkap
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full px-3 py-2.5 rounded-md bg-input border border-border focus:border-primary focus:outline-none text-base"
          placeholder="Contoh: Indra Prastio"
        />
        {errors.name && (
          <p className="text-xs text-destructive mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="text-xs font-semibold text-muted-foreground">
          Nomor WhatsApp
        </label>
        <input
          type="tel"
          inputMode="numeric"
          maxLength={12}
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value.replace(/\D/g, "").slice(0, 12))
          }
          className="mt-1 w-full px-3 py-2.5 rounded-md bg-input border border-border focus:border-primary focus:outline-none text-base"
          placeholder="081234567890"
        />
        <p className="text-[10px] text-muted-foreground mt-1">
          Harus 12 angka, diawali 08
        </p>
        {errors.phone && (
          <p className="text-xs text-destructive mt-1">{errors.phone}</p>
        )}
      </div>

      <div className="space-y-3 rounded-lg border border-border bg-background/30 p-3 sm:p-4">
        <p className="text-xs font-bold text-foreground uppercase tracking-wide">
          Alamat Pengiriman
        </p>
        {coords && !gpsVerified && (
          <p className="text-[11px] text-muted-foreground">
            Lokasi berhasil didapatkan. Silakan lengkapi detail alamat jika
            diperlukan.
          </p>
        )}

        <RegionSearchSelect
          label="Provinsi"
          placeholder="Pilih provinsi"
          searchPlaceholder="Ketik nama provinsi..."
          options={provinces}
          value={province}
          onChange={setProvince}
          loading={loadingProvinces}
          disabled={loadingProvinces}
          error={errors.province}
        />

        <RegionSearchSelect
          label="Kabupaten / Kota"
          placeholder={
            province ? "Pilih kabupaten/kota" : "Pilih provinsi dulu"
          }
          searchPlaceholder="Ketik nama kota, misal: ma..."
          options={regencies}
          value={regency}
          onChange={setRegency}
          disabled={!province || loadingRegencies}
          loading={loadingRegencies}
          error={errors.regency}
        />

        <RegionSearchSelect
          label="Kecamatan"
          placeholder={regency ? "Pilih kecamatan" : "Pilih kabupaten dulu"}
          searchPlaceholder="Ketik nama kecamatan..."
          options={districts}
          value={district}
          onChange={setDistrict}
          disabled={!regency || loadingDistricts}
          loading={loadingDistricts}
          error={errors.district}
        />

        <RegionSearchSelect
          label="Kelurahan / Desa"
          placeholder={
            district ? "Pilih kelurahan/desa" : "Pilih kecamatan dulu"
          }
          searchPlaceholder="Ketik nama kelurahan/desa..."
          options={villages}
          value={village}
          onChange={setVillage}
          disabled={!district || loadingVillages}
          loading={loadingVillages}
          error={errors.village}
        />

        <div>
          <label className="text-xs font-semibold text-muted-foreground">
            Detail alamat/patokan
          </label>
          <input
            type="text"
            value={addressDetail}
            onChange={(e) => setAddressDetail(e.target.value)}
            className="mt-1 w-full px-3 py-2.5 rounded-md bg-input border border-border focus:border-primary focus:outline-none text-base"
            placeholder="(misal: jln sdn sekedek,dekat masjid...)"
          />
          {errors.addressDetail && (
            <p className="text-xs text-destructive mt-1">
              {errors.addressDetail}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground">
          Lokasi GPS <span className="text-destructive">*</span>
        </p>
        <p className="text-[11px] text-muted-foreground">
          Wajib gunakan lokasi saat ini agar alamat pengiriman terisi otomatis.
        </p>
        <button
          type="button"
          onClick={detectLocation}
          disabled={locating}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-md border border-primary/50 bg-primary/5 text-sm font-medium hover:bg-primary/10 transition-smooth"
        >
          {locating ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <MapPin className="h-4 w-4 text-primary" />
          )}
          Gunakan Lokasi Saat Ini
        </button>
        {errors.gps && <p className="text-xs text-destructive">{errors.gps}</p>}

        {coords && (
          <div className="rounded-md border border-primary/30 bg-primary/5 p-3 text-sm space-y-2">
            <p className="flex items-center gap-2 text-primary font-semibold">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              Lokasi berhasil ditemukan
            </p>
            {mapsLabel && (
              <p className="text-xs text-muted-foreground leading-relaxed">
                {mapsLabel}
              </p>
            )}
            {mapsLink && (
              <a
                href={mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-primary font-medium text-xs hover:underline"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Buka lokasi di Google Maps
              </a>
            )}
          </div>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground flex items-start gap-1">
        <ShieldCheck className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
        <span>
          Data hanya untuk pengiriman.{" "}
          <Link to="/kebijakan-privasi" className="text-primary underline">
            Kebijakan Privasi
          </Link>
        </span>
      </p>

      <button
        type="submit"
        disabled={submitting}
        className={`btn-buy w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-md text-base shadow-glow${
          hideSubmitOnMobile ? " hidden md:inline-flex" : ""
        }`}
      >
        {submitting ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <WhatsAppIcon className="h-5 w-5" />
        )}
        {submitting ? "Mengirim..." : submitLabel}
      </button>
    </form>
  );
};

export default BuyerOrderForm;
