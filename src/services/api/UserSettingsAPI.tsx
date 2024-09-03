import axiosInstance from "../axiosInstance";


export const GetUserData = async (userId: number) => {
    try {
        const responses = await axiosInstance.get(`/api/auth/${userId}`);
        return responses.data;
    } catch (error: any) {
        console.error("Error fetching user data:", error);

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

export const GetStripeAccount  = async (userId: number) => {
    try {
        const responses = await axiosInstance.get(`/api/pharmacist-account/${userId}`);
        return responses.data;
    } catch (error: any) {
        console.error("Error fetching stripe account:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const UpdateStripeAccount = async (userId: number, email: string) => {
    try {
        const response = await axiosInstance.put(`/api/pharmacist-account/${userId}?email=${email}`);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user data:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const SetStripeAccount = async (userId: number, email: string) => {
    try {
        const response = await axiosInstance.post(`/api/pharmacist-account?email=${email}&pharmacistId=${userId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error updating user data:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};