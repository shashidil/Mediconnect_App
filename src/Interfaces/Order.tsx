export interface Order {
    orderNumber: string;
    orderDate: string;
    totalAmount: number;
    invoiceNumber: string;
    paymentStatus: 'Paid' | 'Pending';
    orderStatus: 'Awaiting Shipment' | 'Shipped' | 'Complete' | 'Cancelled';
    trackingNumber?: string;
  }