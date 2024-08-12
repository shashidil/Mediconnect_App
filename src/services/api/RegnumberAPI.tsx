import axios from 'axios';
import {BASE_URL} from "../../Constants/Index";

export async function checkRegNumber(regNumber: string): Promise<boolean> {
    

    try {
        const response = await axios.post(`${BASE_URL}/api/checkRegNumber`, null, {
            params: { regNumber },
        });

        if(response.data){
            return true;
        }
else{
    
}
        return false;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to validate registration number');
    }
}
