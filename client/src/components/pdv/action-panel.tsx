import { usePDVStore } from '@/hooks/use-pdv-store';
import { Button } from '@/components/ui/button';
import { MOCK_PRODUCTS, PAYMENT_METHODS, PaymentMethod } from '@/types/pdv';
import { generatePDF } from '@/utils/pdf-generator';
import { 
  ShoppingCart, 
  Barcode, 
  CreditCard, 
  Smartphone, 
  UtensilsCrossed,
  CheckCircle2,
  FileText,
  Plus,
  Loader2
} from 'lucide-react';
import { useState } from 'react';

export function ActionPanel() {
  const {
    currentStep,
    products,
    total,
    selectedPaymentMethod,
    invoiceRequested,
    customerCPF,
    isProcessingPayment,
    setStep,
    addProduct,
    setPaymentMethod,
    setProcessingPayment,
    resetStore,
  } = usePDVStore();

  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleStartPurchase = () => {
    if (invoiceRequested && !customerCPF) {
      alert('Por favor, informe o CPF para emissão da nota fiscal.');
      return;
    }
    setStep('products');
  };

  const handleProceedToPayment = () => {
    if (products.length === 0) {
      alert('Adicione pelo menos um produto antes de prosseguir.');
      return;
    }
    setStep('payment');
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleFinalizePurchase = () => {
    if (!selectedPaymentMethod) {
      alert('Selecione uma forma de pagamento.');
      return;
    }

    setProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentSuccess(true);
      setTimeout(() => {
        setStep('complete');
        setProcessingPayment(false);
      }, 2000);
    }, 3000);
  };

  const handleGeneratePDF = () => {
    if (!selectedPaymentMethod) return;
    
    generatePDF({
      products,
      total,
      paymentMethod: selectedPaymentMethod,
      customerCPF,
      invoiceRequested,
    });
  };

  const handleNewPurchase = () => {
    resetStore();
    setPaymentSuccess(false);
  };

  const getPaymentIcon = (method: PaymentMethod) => {
    switch (method) {
      case 'credit':
      case 'debit':
        return <CreditCard className="w-8 h-8" />;
      case 'voucher':
        return <UtensilsCrossed className="w-8 h-8" />;
      case 'pix':
        return <Smartphone className="w-8 h-8" />;
      default:
        return <CreditCard className="w-8 h-8" />;
    }
  };

  const getPaymentColor = (method: PaymentMethod) => {
    switch (method) {
      case 'credit':
        return 'text-green-600 bg-green-50 hover:bg-green-100 border-green-200';
      case 'debit':
        return 'text-blue-600 bg-blue-50 hover:bg-blue-100 border-blue-200';
      case 'voucher':
        return 'text-orange-600 bg-orange-50 hover:bg-orange-100 border-orange-200';
      case 'pix':
        return 'text-purple-600 bg-purple-50 hover:bg-purple-100 border-purple-200';
      default:
        return 'text-gray-600 bg-gray-50 hover:bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="col-span-3 bg-white rounded-lg shadow-lg p-6">
      <div id="action-panel">
        {/* Initial Actions */}
        {currentStep === 'initial' && (
          <div className="text-center">
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=300"
                alt="Supermarket checkout"
                className="rounded-lg shadow-md mx-auto w-full max-w-md h-48 object-cover mb-6"
              />
              <Button
                onClick={handleStartPurchase}
                className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold py-4 px-8 text-xl shadow-lg"
                size="lg"
              >
                <ShoppingCart className="mr-3 w-6 h-6" />
                Iniciar Compra
              </Button>
            </div>
          </div>
        )}

        {/* Product Scanning */}
        {currentStep === 'products' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-mateus-black mb-4">Escaneie os Produtos</h3>
              <div className="bg-yellow-50 p-6 rounded-lg mb-6 border border-yellow-200">
                <Barcode className="w-12 h-12 text-mateus-black mb-4 mx-auto" />
                <p className="text-mateus-black">Aproxime o código de barras do leitor</p>
              </div>
            </div>

            {/* Mock Barcode Scanner */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.values(MOCK_PRODUCTS).map((product) => (
                <button
                  key={product.id}
                  onClick={() => addProduct(product.id)}
                  className="bg-blue-50 hover:bg-blue-100 p-4 rounded-lg border-2 border-blue-200 transition-all duration-200 hover:scale-105"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded mb-2 mx-auto"
                  />
                  <div className="text-sm font-medium text-gray-700">{product.name}</div>
                  <div className="text-xs text-gray-500">R$ {product.price.toFixed(2)}</div>
                </button>
              ))}
            </div>

            <div className="text-center">
              <Button
                onClick={handleProceedToPayment}
                className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold shadow-lg"
                size="lg"
              >
                <CreditCard className="mr-2 w-5 h-5" />
                Prosseguir para Pagamento
              </Button>
            </div>
          </div>
        )}

        {/* Payment Methods */}
        {currentStep === 'payment' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-mateus-black mb-4">Escolha a Forma de Pagamento</h3>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {Object.entries(PAYMENT_METHODS).map(([method, label]) => (
                <button
                  key={method}
                  onClick={() => handlePaymentMethodSelect(method as PaymentMethod)}
                  className={`p-6 rounded-lg border-2 transition-all duration-200 ${
                    selectedPaymentMethod === method 
                      ? 'ring-4 ring-mateus-yellow ring-opacity-50' 
                      : ''
                  } ${getPaymentColor(method as PaymentMethod)}`}
                >
                  <div className="flex flex-col items-center">
                    {getPaymentIcon(method as PaymentMethod)}
                    <div className="font-bold text-gray-700 mt-3">{label}</div>
                  </div>
                </button>
              ))}
            </div>

            {paymentSuccess && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                <div className="flex items-center">
                  <CheckCircle2 className="mr-2 w-5 h-5" />
                  <span>Pagamento processado com sucesso!</span>
                </div>
              </div>
            )}

            <div className="text-center">
              <Button
                onClick={handleFinalizePurchase}
                disabled={!selectedPaymentMethod || isProcessingPayment}
                className="bg-mateus-black hover:bg-gray-800 text-mateus-yellow font-bold shadow-lg disabled:opacity-50"
                size="lg"
              >
                {isProcessingPayment ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Processando...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 w-5 h-5" />
                    Finalizar Compra
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Purchase Complete */}
        {currentStep === 'complete' && (
          <div className="text-center">
            <div className="mb-8">
              <CheckCircle2 className="w-24 h-24 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-mateus-black mb-2">Compra Finalizada!</h3>
              <p className="text-gray-600">Obrigado por comprar no Mateus Armazém</p>
            </div>
            
            <div className="space-y-4">
              <Button
                onClick={handleGeneratePDF}
                className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold shadow-lg mr-4"
                size="lg"
              >
                <FileText className="mr-2 w-5 h-5" />
                Gerar PDF da Nota
              </Button>
              <Button
                onClick={handleNewPurchase}
                className="bg-mateus-black hover:bg-gray-800 text-mateus-yellow font-bold shadow-lg"
                size="lg"
              >
                <Plus className="mr-2 w-5 h-5" />
                Nova Compra
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
