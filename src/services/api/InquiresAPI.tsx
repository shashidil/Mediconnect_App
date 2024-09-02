import axiosInstance from "../axiosInstance";


export const GetPharmacistInquiries = async () => {
    try {
        const response = await axiosInstance.get(`/api/inquiries/pharmacist-inquiries`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching pharmacist inquiries:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const GetUserInquiries = async () => {
    try {
        const response = await axiosInstance.get(`/api/inquiries/customer-inquiries`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching user inquiries:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const UpdateInquiryStatus = async (inquiryId: number, status: string) => {
    try {
        const response = await axiosInstance.put(`/api/inquiries/update-status/${inquiryId}`, null, {
            params: {
                status,
            },
        });
        return response.data;
    } catch (error: any) {
        console.error("Error updating inquiry status:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};

export const CreateInquiry = async (inquiryData: { subject: string; message: string; status: string; senderId: number; }) => {
    try {
        const response = await axiosInstance.post('/api/inquiries/create', inquiryData);
        return response.data;
    } catch (error: any) {
        console.error("Error creating inquiry:", error);

        if (error.response && error.response.data) {
            return error.response.data;
        }

        throw error;
    }
};
