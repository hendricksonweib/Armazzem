import { create } from 'zustand';
import { PDVState, PDVStep, PaymentMethod, CartItem, MOCK_PRODUCTS } from '@/types/pdv';

interface PDVStore extends PDVState {
  // Actions
  setStep: (step: PDVStep) => void;
  setInvoiceRequested: (requested: boolean) => void;
  setCustomerCPF: (cpf: string) => void;
  addProduct: (productId: string) => void;
  removeProduct: (index: number) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setProcessingPayment: (processing: boolean) => void;
  calculateTotal: () => void;
  resetStore: () => void;
}

const initialState: PDVState = {
  currentStep: 'initial',
  products: [],
  total: 0,
  selectedPaymentMethod: null,
  invoiceRequested: false,
  customerCPF: '',
  isProcessingPayment: false,
};

export const usePDVStore = create<PDVStore>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  setInvoiceRequested: (requested) => set({ invoiceRequested: requested }),

  setCustomerCPF: (cpf) => set({ customerCPF: cpf }),

  addProduct: (productId) => {
    const product = MOCK_PRODUCTS[productId];
    if (!product) return;

    const { products } = get();
    const existingIndex = products.findIndex(p => p.id === productId);

    if (existingIndex >= 0) {
      const updatedProducts = [...products];
      updatedProducts[existingIndex].quantity += 1;
      set({ products: updatedProducts });
    } else {
      const newProduct: CartItem = { ...product, quantity: 1 };
      set({ products: [...products, newProduct] });
    }

    get().calculateTotal();
  },

  removeProduct: (index) => {
    const { products } = get();
    const updatedProducts = products.filter((_, i) => i !== index);
    set({ products: updatedProducts });
    get().calculateTotal();
  },

  setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  setProcessingPayment: (processing) => set({ isProcessingPayment: processing }),

  calculateTotal: () => {
    const { products } = get();
    const total = products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    set({ total });
  },

  resetStore: () => set(initialState),
}));
