import PageLayout from "@/components/layout/PageLayout";
import PageHeader from "@/components/PageHeader";
import { Phone, Mail, MapPin, MessageCircle, Clock } from "lucide-react";

const Contact = () => (
  <PageLayout>
    <PageHeader eyebrow="HUBUNGI KAMI" title="Kontak" description="Tim Sasak Bike siap membantumu — dari konsultasi sepeda sampai pengantaran." />
    <section className="container py-14 grid md:grid-cols-2 gap-6">
      {[
        { icon: MessageCircle, title: "WhatsApp", value: "+62 831-1228-2090", href: "https://wa.me/6283112282090" },
        { icon: Phone, title: "Telepon", value: "+62 831-1228-2090", href: "tel:+6283112282090" },
        { icon: Mail, title: "Email", value: "halo@sasakbike.id", href: "mailto:halo@sasakbike.id" },
        { icon: MapPin, title: "Alamat", value: "Pulau Lombok, NTB", href: "/lokasi" },
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
