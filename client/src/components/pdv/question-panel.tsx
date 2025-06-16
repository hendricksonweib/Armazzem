import { StepIndicator } from './step-indicator';
import { usePDVStore } from '@/hooks/use-pdv-store';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';

export function QuestionPanel() {
  const {
    currentStep,
    products,
    total,
    invoiceRequested,
    customerCPF,
    setInvoiceRequested,
    setCustomerCPF,
    removeProduct,
  } = usePDVStore();

  const formatCPF = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return formatted;
  };

  const handleCPFChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCPF(e.target.value);
    setCustomerCPF(formatted);
  };

  return (
    <div className="col-span-2 bg-white rounded-lg shadow-lg p-6">
      <StepIndicator currentStep={currentStep} />

      <div id="question-panel">
        {/* Step 1: Initial Setup */}
        {currentStep === 'initial' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-4">Sistema PDV</h2>
            <p className="text-gray-600 mb-6">
              Bem-vindo ao Mateus Armazém. Clique no botão ao lado para começar uma nova compra.
            </p>
            
            <div className="bg-mateus-yellow p-6 rounded-lg">
              <h3 className="font-bold text-mateus-black mb-2">Pronto para começar?</h3>
              <p className="text-mateus-black">
                Inicie uma nova venda clicando no botão "CLIQUE PARA COMEÇAR A COMPRA"
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Invoice Question */}
        {currentStep === 'invoice-question' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-6">Pergunta 1 de 2</h2>
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 mb-6">
              <h3 className="text-xl font-semibold text-mateus-black mb-4">
                Você deseja emitir nota fiscal?
              </h3>
              <p className="text-gray-600 mb-4">
                A nota fiscal será gerada em PDF ao final da compra
              </p>
            </div>
          </div>
        )}

        {/* Step 3: CPF Question */}
        {currentStep === 'cpf-question' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-6">Pergunta 2 de 2</h2>
            <div className="bg-green-50 p-6 rounded-lg border border-green-200 mb-6">
              <h3 className="text-xl font-semibold text-mateus-black mb-4">
                Deseja incluir CPF na nota fiscal?
              </h3>
              <p className="text-gray-600 mb-4">
                {invoiceRequested ? 'O CPF será incluído na nota fiscal' : 'Esta opção só está disponível se você escolher emitir nota fiscal'}
              </p>
              
              {invoiceRequested && (
                <div className="mt-4">
                  <Label htmlFor="cpf-input" className="block text-mateus-black font-medium mb-2">
                    Digite o CPF do cliente:
                  </Label>
                  <Input
                    id="cpf-input"
                    type="text"
                    placeholder="000.000.000-00"
                    value={customerCPF}
                    onChange={handleCPFChange}
                    maxLength={14}
                    className="text-lg"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Products */}
        {currentStep === 'products' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-4">Produtos Escaneados</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Nenhum produto adicionado ainda.
                  <br />
                  Clique nos produtos ao lado para adicioná-los.
                </p>
              ) : (
                products.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-mateus-black">{product.name}</div>
                      <div className="text-sm text-gray-500">Qtd: {product.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-mateus-black">R$ {product.price.toFixed(2)}</div>
                      <button
                        onClick={() => removeProduct(index)}
                        className="text-red-500 text-sm hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-mateus-black">Total:</span>
                <span className="text-2xl font-bold text-mateus-black">R$ {total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 'payment' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-4">Finalizar Compra</h2>
            <div className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold text-mateus-black">Total da Compra:</span>
                  <span className="text-2xl font-bold text-mateus-black">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Itens:</span>
                  <span className="text-sm text-gray-600">{products.length}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Complete */}
        {currentStep === 'complete' && (
          <div>
            <h2 className="text-2xl font-bold text-mateus-black mb-4">Compra Finalizada!</h2>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <p className="text-green-700 font-medium">Pagamento processado com sucesso!</p>
              <p className="text-green-600 text-sm mt-2">
                Obrigado por comprar no Mateus Armazém
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
