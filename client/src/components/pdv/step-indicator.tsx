import { PDVStep } from '@/types/pdv';

interface StepIndicatorProps {
  currentStep: PDVStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = ['initial', 'products', 'payment'];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        {steps.map((step, index) => (
          <div key={step} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                index <= currentIndex 
                  ? 'bg-mateus-yellow text-mateus-black' 
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`w-16 h-1 mx-2 ${
                  index < currentIndex ? 'bg-mateus-yellow' : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
