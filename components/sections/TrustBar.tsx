import { CircleCheck } from "lucide-react";

interface TrustBarProps {
  items: Array<{ text: string }>;
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="border-b bg-card py-6">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        <ul className="flex flex-wrap justify-center gap-6 md:gap-8">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-sm md:text-base">
              <CircleCheck className="h-5 w-5 shrink-0 text-primary" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
