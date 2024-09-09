
import axiosInstance from '../axiosInstance';
import{UpdateOrderRequest} from '../../Interfaces/UpdateOrderRequest'

interface ProcessOrderPaymentRequest {
  invoiceId: number;
  orderNumber: string;
  pharmacistId: number;
  customerId: number;
  paymentMethod: string;
  amount: number;
}

interface CreatePaymentIntentRequest {
  amount: number;
}

// Create Payment Intent API Call
export const createPaymentIntent = async (data: CreatePaymentIntentRequest) => {
  try {
    const response = await axiosInstance.post('/api/orders/create-payment-intent', data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create payment intent', error);
    throw error;
  }
};

// Process Order Payment API Call
export const processOrderPayment = async (paymentData: ProcessOrderPaymentRequest) => {
  try {
    const response = await axiosInstance.post('/api/orders/process-payment', paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Payment processing failed', error);
    throw error;
  }
};

export const fetchOrderHistory = async (id: number, isPharmacist: boolean) => {
  try {
    console.log(isPharmacist);
    const params = isPharmacist ? { pharmacistId: id } : { customerId: id };
    const response = await axiosInstance.get(`/api/orders/history`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch order history', error);
    throw error;
  }
};





export const updateOrder = async (orderId: number, updateData: UpdateOrderRequest) => {
  console.log(orderId)
  try {
    const response = await axiosInstance.put(`/api/orders/update/${orderId}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};