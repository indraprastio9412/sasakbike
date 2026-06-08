import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import SEO from "@/components/SEO";
import {
  buildWhatsAppUrl,
  formatWhatsAppDisplay,
  getWhatsAppInternationalNumber,
} from "@/lib/whatsapp-config";
import { STORE_MAPS_URL } from "@/lib/store-location";
import { absoluteUrl } from "@/lib/site-config";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const waDisplay = formatWhatsAppDisplay();
const waIntl = getWhatsAppInternationalNumber();

const Contact = () => (
  <PageLayout>
    <SEO
      title="Kontak Sasak Bike — WhatsApp & Alamat Lombok"
      description={`Hubungi Sasak Bike via WhatsApp ${waDisplay} atau email. Jam operasional 08.00–21.00 WITA, melayani sepulau Lombok.`}
      path="/kontak"
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: "Sasak Bike",
        telephone: `+${waIntl}`,
        email: "sasakbike9412@gmail.com",
        url: absoluteUrl("/kontak"),
        address: { "@type": "PostalAddress", addressLocality: "Lombok", addressRegion: "NTB", addressCountry: "ID" },
        openingHoursSpecification: [{
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "08:00",
          closes: "21:00",
        }],
      }}
    />
    <PageHeader eyebrow="HUBUNGI KAMI" title="Kontak" description="Tim Sasak Bike siap membantumu — dari konsultasi sepeda sampai pengantaran." />
    <section className="container py-14 grid md:grid-cols-2 gap-6">
      {[
        { icon: MessageCircle, title: "WhatsApp", value: waDisplay, href: buildWhatsAppUrl("Halo Sasak Bike, saya ingin bertanya.") },
        { icon: Phone, title: "Telepon", value: waDisplay, href: `tel:+${waIntl}` },
        { icon: Mail, title: "Email", value: "sasakbike9412@gmail.com", href: "mailto:sasakbike9412@gmail.com" },
        { icon: MapPin, title: "Alamat", value: "Lihat di Google Maps", href: STORE_MAPS_URL },
        { icon: Clock, title: "Jam Operasional", value: "Senin - Minggu, 08.00 - 21.00 WITA" },
      ].map((c, i) => (
        <a
          key={i}
          href={c.href}
          target={c.href?.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="p-6 rounded-2xl bg-gradient-card border border-border flex items-center gap-5 transition-smooth hover:border-primary hover:-translate-y-1 animate-fade-up"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <c.icon className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-xs tracking-widest text-muted-foreground">{c.title.toUpperCase()}</p>
            <p className="font-display font-bold mt-1">{c.value}</p>
          </div>
        </a>
      ))}
    </section>
  </PageLayout>
);

export default Contact;
