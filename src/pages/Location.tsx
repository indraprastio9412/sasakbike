import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import { STORE_MAPS_EMBED_URL, STORE_MAPS_URL } from "@/lib/store-location";
import { ExternalLink, MapPin, Truck } from "lucide-react";

const areas = ["Kota Mataram", "Lombok Barat", "Lombok Tengah", "Lombok Timur", "Lombok Utara"];

const Location = () => (
  <PageLayout>
    <SEO
      title="Lokasi & Area Pengantaran — Sasak Bike Lombok"
      description="Sasak Bike melayani COD ke Kota Mataram, Lombok Barat, Tengah, Timur, dan Utara. Lihat peta lokasi toko di sini."
      path="/lokasi"
    />
    <PageHeader eyebrow="LOKASI KAMI" title="Lokasi Sasak Bike" description="Berbasis di Pulau Lombok — siap melayani sepulau Lombok dengan sistem COD." />

    <section className="container py-14 space-y-10">
      <div className="space-y-3 animate-fade-up">
        <div className="rounded-3xl overflow-hidden border border-border shadow-card">
          <iframe
            title="Lokasi Sasak Bike"
            src={STORE_MAPS_EMBED_URL}
            width="100%"
            height="450"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <a
          href={STORE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          Buka lokasi di Google Maps
        </a>
      </div>

      <div>
        <h2 className="font-display text-2xl font-black mb-6 flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" /> Area Pengantaran Sepulau Lombok
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {areas.map((a, i) => (
            <div key={a} className="p-4 rounded-xl bg-gradient-card border border-border flex items-center gap-2 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold">{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  </PageLayout>
);

export default Location;
