import axiosInstance from "../axiosInstance";

export const GetOrdersByDateRange = async (fromDate: string, toDate: string) => {
    try {
        const response = await axiosInstance.get(`/api/reports/orders-by-date-range`, {
            params: {
                fromDate,
                toDate,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error fetching orders by date range:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};
