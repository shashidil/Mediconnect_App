
import axios from 'axios';
import {BASE_URL} from "../../Constants/Index";
import axiosInstance from '../axiosInstance';


interface PharmacistIdRequest {
  PharmacistId: number[];
  }

  export const fetchPharmacistsByCity = async (city: string) => {
    try {
      const response = await axiosInstance.get(`/api/pharmacists/city/${city}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pharmacists by city', error);
      throw error;
    }
  };
  
  export const fetchPharmacistsByState = async (state: string) => {
    try {
      const response = await axiosInstance.get(`/api/pharmacists/state/${state}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch pharmacists by state', error);
      throw error;
    }
  };
  
  export const uploadPrescription = async (file: File, userId: number, pharmacistIds: number[]) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('pharmacistIds', JSON.stringify(pharmacistIds));
  
    try {
      const response = await axiosInstance.post(`/api/medicine-requests/uploadPrescription/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to upload file', error);
      throw error;
    }

  };


  export const getPrescriptions = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/api/medicine-requests/${userId}`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch Prescriptions', error);
      throw error;
    }
  };


