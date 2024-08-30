import axiosInstance from "../axiosInstance";


export const GetUserData = async (userId: number) => {
    try {
        const responses = await axiosInstance.get(`/api/auth/${userId}`);
        return responses.data;
    } catch (error: any) {
        console.error("Error fetching invoices:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const UpdateUserData = async (userId: number, userData: any) => {
    try {
        const response = await axiosInstance.put(`/api/auth/${userId}`, userData);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user data:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};