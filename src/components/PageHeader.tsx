const PageHeader = ({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) => (
  <section className="relative pt-16 pb-12 border-b border-border overflow-hidden">
    <div className="absolute inset-0 -z-10 opacity-40"
      style={{ background: "radial-gradient(ellipse at center top, hsl(142 90% 40% / 0.25), transparent 60%)" }} />
    <div className="container text-center animate-fade-up">
      {eyebrow && <p className="text-xs tracking-[0.4em] text-primary mb-3">{eyebrow}</p>}
      <h1 className="font-display text-4xl md:text-6xl font-black mb-4">
        <span className="text-gradient">{title}</span>
      </h1>
      {description && <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>}
    </div>
  </section>
);

export default PageHeader;
