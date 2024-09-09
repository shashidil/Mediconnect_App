import axiosInstance from "../axiosInstance";

export const SendInvoice = async (formData: any) => {
    try {
      const response = await axiosInstance.post(`/api/invoices`, formData);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  export const GetInvoice = async (userId: number) => {
    try {
      const responses = await axiosInstance.get(`/api/invoices/${userId}`);
      return responses.data;
    } catch (error: any) {
      // Log the error for debugging
      console.error("Error fetching invoices:", error);
  
      // Check if the error response contains data and return it
      if (error.response && error.response.data) {
        return error.response.data;
      }
  
      // Throw the error if no response data is present
      throw error;
    }
  };
  export const GetInvoiceByInvoceNumber = async (invoiceId: number) => {
    try {
      const response = await axiosInstance.get(`/api/invoices/number/${invoiceId}`);
      return response.data;
    } catch (error: any) {
      console.error("Error fetching invoices:", error);
      if (error.response && error.response.data) {
        return error.response.data;
      }
      throw error;
    }
  };
  