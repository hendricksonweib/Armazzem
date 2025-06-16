import { PDVStep } from '@/types/pdv';

interface StepIndicatorProps {
  currentStep: PDVStep;
}

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = ['initial', 'invoice-question', 'cpf-question', 'products', 'payment', 'complete'];
  const stepLabels = ['Início', 'Nota Fiscal', 'CPF', 'Produtos', 'Pagamento', 'Finalizado'];
  const currentIndex = steps.indexOf(currentStep);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-2 ${
                index <= currentIndex 
                  ? 'bg-mateus-yellow text-mateus-black border-2 border-mateus-black' 
                  : 'bg-gray-300 text-gray-500'
              }`}
            >
              {index + 1}
            </div>
            <span className={`text-xs font-medium ${
              index <= currentIndex ? 'text-mateus-black' : 'text-gray-400'
            }`}>
              {stepLabels[index]}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`absolute w-16 h-1 mt-5 ml-10 ${
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
