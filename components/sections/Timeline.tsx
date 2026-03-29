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
        <h2 className="mb-12 text-center">Parcours</h2>

        {/* Desktop: horizontal */}
        <div className="hidden md:block">
          <div className="relative mx-auto max-w-4xl pr-10">
            {/* Ligne horizontale : du centre du 1er point jusqu'à la flèche */}
            <div
              className="absolute h-[2px] bg-primary"
              style={{
                top: "15px",
                left: `${100 / items.length / 2}%`,
                right: "-2.5rem",
              }}
            />
            {/* Flèche à droite */}
            <div
              className="absolute"
              style={{ top: "8px", right: "calc(-2.5rem - 14px)" }}
            >
              <svg width="16" height="14" viewBox="0 0 16 14" className="text-primary">
                <polygon points="0,0 16,7 0,14" fill="currentColor" />
              </svg>
            </div>

            <div className="relative flex justify-between">
              {items.map((item) => (
                <div key={item.year} className="flex flex-col items-center" style={{ width: `${100 / items.length}%` }}>
                  <div className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                  <span className="mt-3 text-lg font-bold text-primary">{item.year}</span>
                  <p className="mt-1 text-center text-sm text-muted-foreground">{item.label}</p>
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

            <div className="space-y-8">
              {items.map((item) => (
                <div key={item.year} className="relative flex gap-6">
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
