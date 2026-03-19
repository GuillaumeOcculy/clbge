interface MissionStep {
  _id: string;
  title: string;
  description: string;
  stepNumber: number;
}

interface MissionStepsProps {
  steps: MissionStep[];
  hideTitle?: boolean;
}

export function MissionSteps({ steps, hideTitle }: MissionStepsProps) {
  return (
    <section className="bg-card py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8 lg:px-16">
        {!hideTitle && (
          <div className="mb-12 text-center">
            <h2 className="mb-4">Comment se déroule une mission</h2>
            <div className="mx-auto h-0.5 w-12 bg-primary" />
          </div>
        )}

        <ol className="flex flex-col gap-8 md:flex-row md:gap-4">
          {steps.map((step, index) => (
            <li key={step._id} className="relative flex flex-1 items-start gap-4 md:flex-col md:items-center md:text-center">
              {/* Connecteur vertical mobile / horizontal desktop */}
              {index > 0 && (
                <>
                  <div className="absolute -top-8 left-[19px] h-8 w-0.5 bg-primary md:hidden" />
                  <div className="absolute -left-4 top-[19px] hidden h-0.5 w-4 bg-primary md:block" />
                </>
              )}
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
                  {step.stepNumber}
                </div>
              </div>
              <div className="md:mt-4">
                <h3 className="mb-1 font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
