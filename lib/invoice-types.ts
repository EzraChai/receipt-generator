export interface Student {
  name: string;
}

export interface ReceiptItem {
  id: string;
  subject: string;
  ratePerMonth: number;
  description?: string;
}

export interface Receipt {
  receiptNumber: string;
  student: Student;
  items: ReceiptItem[];
  notes?: string;
}

export function calculateSubtotal(items: ReceiptItem[]): number {
  return items.reduce((sum, item) => sum + item.ratePerMonth, 0);
}

export function calculateTotal(subtotal: number): number {
  return subtotal;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
  }).format(amount);
}

export function generateReceiptNumber(): string {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `RCP-${year}${month}-${random}`;
}
