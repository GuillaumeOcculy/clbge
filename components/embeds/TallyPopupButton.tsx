"use client";

interface TallyPopupButtonProps {
  formId: string;
  label?: string;
}

export function TallyPopupButton({
  formId,
  label = "Démarrer le diagnostic",
}: TallyPopupButtonProps) {
  return (
    <button
      data-tally-open={formId}
      data-tally-layout="modal"
      data-tally-width="700"
      data-tally-emoji-text="👋"
      data-tally-emoji-animation="wave"
      data-tally-auto-close="3000"
      className="inline-flex cursor-pointer items-center justify-center rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
    >
      {label}
    </button>
  );
}
