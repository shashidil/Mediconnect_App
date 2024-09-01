import axiosInstance from "../axiosInstance";


export const GetMonthlyOrderQuantities = async () => {
    try {
        const response = await axiosInstance.get(`/api/reports/order-quantities-month`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching monthly order quantities:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const GetTopMedicinesForMonth = async () => {
    try {
        const response = await axiosInstance.get(`/api/reports/top-medicines/month`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching top medicines for the month:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};