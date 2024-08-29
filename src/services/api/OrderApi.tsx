import axios from 'axios';
import axiosInstance from '../axiosInstance';
import{UpdateOrderRequest} from '../../Interfaces/UpdateOrderRequest'

export const processOrderPayment = async (
  Id: number,
  orderNumber: String,
  pharmacistId: number,
  customerId: number,
  paymentMethod: string,
  amount: number
) => {
  try {
    const response = await axiosInstance.post('/api/orders/process-payment', null, {
      params: {
        Id,
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