import jsPDF from 'jspdf';
import { CartItem, PaymentMethod, PAYMENT_METHODS } from '@/types/pdv';

interface GeneratePDFOptions {
  products: CartItem[];
  total: number;
  paymentMethod: PaymentMethod;
  customerCPF?: string;
  invoiceRequested: boolean;
}

export const generatePDF = ({
  products,
  total,
  paymentMethod,
  customerCPF,
  invoiceRequested
}: GeneratePDFOptions) => {
  const doc = new jsPDF();

  // Header
  doc.setFontSize(20);
  doc.text('MATEUS ARMAZÉM', 20, 30);
  doc.setFontSize(12);
  doc.text('Nota Fiscal de Venda', 20, 40);
  doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 20, 50);
  doc.text(`Hora: ${new Date().toLocaleTimeString('pt-BR')}`, 20, 60);
  
  if (invoiceRequested && customerCPF) {
    doc.text(`CPF: ${customerCPF}`, 20, 70);
  }

  // Products header
  doc.text('PRODUTOS:', 20, 90);
  let yPosition = 100;
  
  products.forEach(product => {
    const line = `${product.name} - Qtd: ${product.quantity} - R$ ${product.price.toFixed(2)}`;
    doc.text(line, 30, yPosition);
    yPosition += 10;
  });

  // Total
  doc.setFontSize(14);
  doc.text(`TOTAL: R$ ${total.toFixed(2)}`, 20, yPosition + 20);
  
  // Payment method
  doc.setFontSize(12);
  doc.text(`Forma de Pagamento: ${PAYMENT_METHODS[paymentMethod]}`, 20, yPosition + 35);

  // Save PDF
  doc.save('nota-fiscal-mateus.pdf');
};
