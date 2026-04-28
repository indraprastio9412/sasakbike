import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { MapPin, Truck } from "lucide-react";

const areas = ["Mataram", "Cakranegara", "Senggigi", "Praya", "Selong", "Tanjung", "Sembalun", "Kuta Mandalika", "Bayan", "Pemenang", "Gerung", "Lembar"];

const Location = () => (
  <PageLayout>
    <PageHeader eyebrow="LOKASI KAMI" title="Lokasi Sasak Bike" description="Berbasis di Pulau Lombok — siap melayani sepulau Lombok dengan sistem COD." />

    <section className="container py-14 space-y-10">
      <div className="rounded-3xl overflow-hidden border border-border shadow-card animate-fade-up">
        <iframe
          title="Lokasi Sasak Bike"
          src="https://www.google.com/maps?q=Mataram,Lombok&output=embed"
          width="100%"
          height="450"
          style={{ border: 0, filter: "invert(0.92) hue-rotate(180deg)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
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
