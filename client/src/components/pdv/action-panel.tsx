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
  Loader2,
  Camera,
  Keyboard
} from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

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
    setInvoiceRequested,
    setCustomerCPF,
    resetStore,
  } = usePDVStore();

  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

  const handleStartPurchase = () => {
    setStep('invoice-question');
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
    setManualBarcode('');
    setShowManualEntry(false);
  };

  const handleManualBarcodeSubmit = () => {
    const foundProduct = Object.values(MOCK_PRODUCTS).find(p => p.barcode === manualBarcode);
    if (foundProduct) {
      addProduct(foundProduct.id);
      setManualBarcode('');
    } else {
      alert('Produto não encontrado com este código de barras');
    }
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
              {/* Logo do Mateus Armazém */}
              <div className="bg-mateus-yellow p-8 rounded-2xl shadow-xl mx-auto max-w-lg mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-mateus-black text-mateus-yellow px-6 py-3 rounded-xl font-bold text-3xl mr-4">
                    MATEUS
                  </div>
                  <span className="text-mateus-black font-bold text-2xl">ARMAZÉM</span>
                </div>
                <div className="text-mateus-black font-semibold text-lg">
                  Sistema PDV - Ponto de Venda
                </div>
              </div>

              {/* Imagem grande */}
              <img
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Caixa do supermercado"
                className="rounded-2xl shadow-2xl mx-auto w-full max-w-2xl h-80 object-cover mb-8"
              />
              
              {/* Aviso */}
              <div className="bg-white p-6 rounded-xl shadow-lg mb-6 border-l-4 border-mateus-yellow">
                <p className="text-mateus-black text-lg font-medium mb-2">
                  Bem-vindo ao Mateus Armazém!
                </p>
                <p className="text-gray-600">
                  Clique no botão abaixo para começar uma nova compra
                </p>
              </div>

              <Button
                onClick={handleStartPurchase}
                className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold py-6 px-12 text-2xl shadow-2xl rounded-xl transform hover:scale-105 transition-all"
                size="lg"
              >
                <ShoppingCart className="mr-4 w-8 h-8" />
                CLIQUE PARA COMEÇAR A COMPRA
              </Button>
            </div>
          </div>
        )}

        {/* Invoice Question Buttons */}
        {currentStep === 'invoice-question' && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-mateus-black mb-8">Escolha sua opção:</h3>
            <div className="flex justify-center space-x-8">
              <Button
                onClick={() => {
                  setInvoiceRequested(true);
                  setStep('cpf-question');
                }}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-12 text-2xl shadow-2xl rounded-xl transform hover:scale-105 transition-all"
                size="lg"
              >
                <CheckCircle2 className="mr-4 w-8 h-8" />
                SIM
              </Button>
              <Button
                onClick={() => {
                  setInvoiceRequested(false);
                  setStep('cpf-question');
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-8 px-12 text-2xl shadow-2xl rounded-xl transform hover:scale-105 transition-all"
                size="lg"
              >
                ✕ NÃO
              </Button>
            </div>
          </div>
        )}

        {/* CPF Question Buttons */}
        {currentStep === 'cpf-question' && (
          <div className="text-center">
            <h3 className="text-xl font-bold text-mateus-black mb-8">Escolha sua opção:</h3>
            <div className="flex justify-center space-x-8">
              <Button
                onClick={() => {
                  if (invoiceRequested) {
                    // Se escolheu SIM, espera o CPF ser digitado
                    setStep('products');
                  } else {
                    setStep('products');
                  }
                }}
                disabled={invoiceRequested && !customerCPF}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-8 px-12 text-2xl shadow-2xl rounded-xl transform hover:scale-105 transition-all disabled:opacity-50"
                size="lg"
              >
                <CheckCircle2 className="mr-4 w-8 h-8" />
                {invoiceRequested ? 'SIM (Digite o CPF)' : 'SIM'}
              </Button>
              <Button
                onClick={() => {
                  setCustomerCPF('');
                  setStep('products');
                }}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-8 px-12 text-2xl shadow-2xl rounded-xl transform hover:scale-105 transition-all"
                size="lg"
              >
                ✕ NÃO
              </Button>
            </div>
          </div>
        )}

        {/* Product Scanning */}
        {currentStep === 'products' && (
          <div>
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-mateus-black mb-4">Adicionar Produtos</h3>
              
              {/* Scan Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <Button
                  onClick={() => setShowManualEntry(!showManualEntry)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-xl"
                  size="lg"
                >
                  <Camera className="mr-2 w-6 h-6" />
                  Abrir Câmera
                </Button>
                <Button
                  onClick={() => setShowManualEntry(!showManualEntry)}
                  className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-xl"
                  size="lg"
                >
                  <Keyboard className="mr-2 w-6 h-6" />
                  Digitar Código
                </Button>
              </div>

              {/* Manual Barcode Entry */}
              {showManualEntry && (
                <div className="bg-gray-50 p-6 rounded-lg mb-6 border border-gray-200">
                  <h4 className="font-bold text-mateus-black mb-4">Digite o código de barras:</h4>
                  <div className="flex space-x-2">
                    <Input
                      type="text"
                      placeholder="Ex: 7891234567890"
                      value={manualBarcode}
                      onChange={(e) => setManualBarcode(e.target.value)}
                      className="text-lg"
                    />
                    <Button
                      onClick={handleManualBarcodeSubmit}
                      disabled={!manualBarcode}
                      className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Camera simulation area */}
              <div className="bg-black p-8 rounded-lg mb-6 relative">
                <div className="bg-gray-800 border-4 border-mateus-yellow rounded-lg p-8 text-center">
                  <Camera className="w-16 h-16 text-mateus-yellow mb-4 mx-auto" />
                  <p className="text-mateus-yellow text-lg font-bold">CÂMERA ATIVA</p>
                  <p className="text-gray-300 text-sm mt-2">Aponte para o código de barras</p>
                  
                  {/* Scanning line animation */}
                  <div className="w-full h-1 bg-red-500 mt-4 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Mock Products for Testing */}
            <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
              <h4 className="font-bold text-mateus-black mb-4">Produtos para Teste (Clique para adicionar):</h4>
              <div className="grid grid-cols-3 gap-2">
                {Object.values(MOCK_PRODUCTS).map((product) => (
                  <button
                    key={product.id}
                    onClick={() => addProduct(product.id)}
                    className="bg-white hover:bg-gray-100 p-3 rounded-lg border-2 border-gray-200 transition-all duration-200 hover:scale-105 text-xs"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded mb-1 mx-auto"
                    />
                    <div className="font-medium text-gray-700">{product.name}</div>
                    <div className="text-gray-500">R$ {product.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <Button
                onClick={handleProceedToPayment}
                className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold shadow-lg py-4 px-8 text-lg"
                size="lg"
              >
                <CreditCard className="mr-2 w-6 h-6" />
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
            {/* Success Animation */}
            <div className="mb-8">
              <div className="bg-green-100 p-8 rounded-full mx-auto w-32 h-32 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
              </div>
              
              {/* Thank you message */}
              <div className="bg-mateus-yellow p-8 rounded-2xl shadow-xl mb-6">
                <h3 className="text-3xl font-bold text-mateus-black mb-4">🎉 COMPRA FINALIZADA! 🎉</h3>
                <div className="bg-mateus-black text-mateus-yellow p-4 rounded-xl mb-4">
                  <p className="text-xl font-bold">OBRIGADO POR COMPRAR NO</p>
                  <p className="text-2xl font-bold">MATEUS ARMAZÉM</p>
                </div>
                <p className="text-mateus-black font-medium text-lg">
                  Sua compra foi processada com sucesso!
                </p>
                <p className="text-mateus-black text-sm mt-2">
                  Volte sempre! Estamos aqui para servi-lo.
                </p>
              </div>

              {/* Purchase Summary */}
              <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-green-500 mb-6">
                <h4 className="font-bold text-gray-800 mb-2">Resumo da Compra:</h4>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Total de itens:</span>
                  <span className="font-bold text-gray-800">{products.length}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Valor total:</span>
                  <span className="font-bold text-green-600 text-xl">R$ {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Forma de pagamento:</span>
                  <span className="font-bold text-gray-800">{selectedPaymentMethod ? PAYMENT_METHODS[selectedPaymentMethod] : ''}</span>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-4">
              {invoiceRequested && (
                <Button
                  onClick={handleGeneratePDF}
                  className="bg-mateus-yellow hover:bg-yellow-500 text-mateus-black font-bold shadow-2xl py-6 px-8 text-lg rounded-xl transform hover:scale-105 transition-all mr-4"
                  size="lg"
                >
                  <FileText className="mr-3 w-6 h-6" />
                  Baixar Nota Fiscal (PDF)
                </Button>
              )}
              <Button
                onClick={handleNewPurchase}
                className="bg-mateus-black hover:bg-gray-800 text-mateus-yellow font-bold shadow-2xl py-6 px-8 text-lg rounded-xl transform hover:scale-105 transition-all"
                size="lg"
              >
                <Plus className="mr-3 w-6 h-6" />
                Iniciar Nova Compra
              </Button>
            </div>

            {/* Footer Message */}
            <div className="mt-8 text-sm text-gray-500">
              <p>Sistema PDV Mateus Armazém v1.0</p>
              <p>Tenha um ótimo dia! 😊</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
