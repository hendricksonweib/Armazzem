export interface Product {
  id: string;
  name: string;
  price: number;
  barcode: string;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type PaymentMethod = 'credit' | 'debit' | 'voucher' | 'pix';

export type PDVStep = 'initial' | 'invoice-question' | 'cpf-question' | 'products' | 'payment' | 'complete';

export interface PDVState {
  currentStep: PDVStep;
  products: CartItem[];
  total: number;
  selectedPaymentMethod: PaymentMethod | null;
  invoiceRequested: boolean;
  customerCPF: string;
  isProcessingPayment: boolean;
}

export const MOCK_PRODUCTS: Record<string, Product> = {
  '1': {
    id: '1',
    name: 'Arroz Integral',
    price: 8.99,
    barcode: '7891234567890',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  },
  '2': {
    id: '2',
    name: 'Leite Integral',
    price: 4.50,
    barcode: '7891234567891',
    image: 'https://images.unsplash.com/photo-1574755393849-623942496936?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  },
  '3': {
    id: '3',
    name: 'Pão Integral',
    price: 3.20,
    barcode: '7891234567892',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  },
  '4': {
    id: '4',
    name: 'Maçã Gala',
    price: 2.80,
    barcode: '7891234567893',
    image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  },
  '5': {
    id: '5',
    name: 'Banana Prata',
    price: 5.40,
    barcode: '7891234567894',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  },
  '6': {
    id: '6',
    name: 'Queijo Minas',
    price: 12.90,
    barcode: '7891234567895',
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100'
  }
};

export const PAYMENT_METHODS = {
  credit: 'Cartão de Crédito',
  debit: 'Cartão de Débito',
  voucher: 'Vale Alimentação',
  pix: 'PIX'
} as const;
