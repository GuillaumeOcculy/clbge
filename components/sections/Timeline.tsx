interface TimelineItem {
  year: string;
  label: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <section className="bg-card py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <h2 className="mb-12 text-center">Notre histoire</h2>

        {/* Desktop: horizontal */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-5xl pr-12">
            {/* Ligne horizontale : du centre du 1er point jusqu'à la flèche */}
            <div
              className="absolute h-[2px] bg-primary"
              style={{
                top: "19px",
                left: `${100 / items.length / 2}%`,
                right: "-3rem",
              }}
            />
            {/* Flèche à droite */}
            <div
              className="absolute"
              style={{ top: "10px", right: "calc(-3rem - 18px)" }}
            >
              <svg width="20" height="18" viewBox="0 0 20 18" className="text-primary">
                <polygon points="0,0 20,9 0,18" fill="currentColor" />
              </svg>
            </div>

            <div className="relative flex justify-between gap-4">
              {items.map((item) => (
                <div key={item.year} className="flex flex-col items-center" style={{ width: `${100 / items.length}%` }}>
                  <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <div className="h-4 w-4 rounded-full bg-white" />
                  </div>
                  <span className="mt-4 text-2xl font-bold text-primary">{item.year}</span>
                  <p className="mt-2 text-center text-base text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden">
          <div className="relative ml-4 pb-4">
            {/* Ligne verticale */}
            <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-primary" />
            {/* Flèche en bas */}
            <div className="absolute left-[9px] -bottom-3">
              <svg width="14" height="16" viewBox="0 0 14 16" className="text-primary">
                <polygon points="0,0 14,0 7,16" fill="currentColor" />
              </svg>
            </div>

            <div className="space-y-5">
              {items.map((item) => (
                <div key={item.year} className="relative flex gap-5">
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                  <div className="pt-1">
                    <span className="text-lg font-bold text-primary">{item.year}</span>
                    <p className="mt-1 text-sm text-muted-foreground">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
