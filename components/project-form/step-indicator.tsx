import React from "react";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-3 w-full max-w-xs mx-auto mb-8">
      {Array.from({ length: totalSteps }).map((_, idx) => {
        const stepNum = idx + 1;
        const isActive = currentStep === stepNum;
        const isCompleted = currentStep > stepNum;

        return (
          <React.Fragment key={stepNum}>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-all duration-200 ${
                isActive
                  ? "bg-[#2563EB] text-white shadow-sm ring-4 ring-[#2563EB]/20"
                  : isCompleted
                  ? "bg-[#111111] text-white"
                  : "bg-[#F7F8FA] text-[#8A8F98] border border-[#E5E7EB]"
              }`}
            >
              {stepNum}
            </div>
            {stepNum < totalSteps && (
              <div
                className={`h-0.5 flex-1 transition-colors duration-200 ${
                  isCompleted ? "bg-[#111111]" : "bg-[#E5E7EB]"
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
