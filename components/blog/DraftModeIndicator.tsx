import Link from "next/link";

export function DraftModeIndicator() {
  return (
    <div className="fixed bottom-4 left-4 z-50 rounded-md bg-amber-500 px-4 py-2 text-sm font-medium text-white shadow-lg">
      Mode prévisualisation{" "}
      <Link
        href="/api/draft-mode/disable"
        className="ml-2 underline underline-offset-2 hover:text-amber-100"
      >
        Quitter
      </Link>
    </div>
  );
}
