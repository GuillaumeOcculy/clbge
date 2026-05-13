import { CircleCheck } from "lucide-react";

interface TrustBarProps {
  items: Array<{ text: string }>;
}

export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="border-t border-b bg-card py-2.5">
      <div className="mx-auto max-w-6xl px-4">
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-1">
          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-xs leading-tight md:text-sm">
              <CircleCheck className="h-4 w-4 shrink-0 text-primary" />
              <span>{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
