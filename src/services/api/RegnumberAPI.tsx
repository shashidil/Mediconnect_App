import axios from 'axios';

const VERIFY_URL = "http://localhost:8080/api/checkRegNumber";  
export async function checkRegNumber(regNumber: string): Promise<boolean> {
    try {
        const response = await axios.post(VERIFY_URL, null, {
            params: {
                regNumber: regNumber
            }
        });

        const data = response.data;

        if (data && data.reg_no === regNumber) {
            return true;  
        }

        return false;  
    } catch (error) {
        console.error('Error validating registration number:', error);
        throw new Error('Failed to validate registration number');
    }
}
