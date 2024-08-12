import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const processOrderPayment = async (
  invoiceId: String,
  orderNumber: String,
  pharmacistId: number,
  customerId: number,
  paymentMethod: string,
  amount: number
) => {
  try {
    const response = await axiosInstance.post('/api/orders/process-payment', null, {
      params: {
        invoiceId,
        orderNumber,
        pharmacistId,
        customerId,
        paymentMethod,
        amount,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Payment processing failed', error);
    throw error;
  }
};
