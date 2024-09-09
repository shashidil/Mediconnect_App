import axiosInstance from "../axiosInstance";

export const GetNotifications = async (userId: number) => {
    try {
        const response = await axiosInstance.get(`/api/auth/notification/${userId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching notifications:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }
        throw error;
    }
};
