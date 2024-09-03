
import axios from "axios";
import {BASE_URL} from "../../Constants/Index";
import { notification} from "antd";
import { SignupDto } from "../../Interfaces/signupDto";
import { SigninDto } from "../../Interfaces/SigninDto";

export async function registerUser(signupData:SignupDto){
    try {
        const response = await axios.post(`${BASE_URL}/api/auth/signup`, signupData);
        if (response.status === 200) {
            notification.success({
                message: 'Success',
                description: 'User Register Successfully',
            });
            return true;
        } else {
            console.log('Failed to update data to the backend');
            return false;
        }
    } catch (error) {
        
        console.log('Failed to update data to the backend')
        return false;
    }   
}
export async function loginUser(loginDto: SigninDto) {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/signin`, loginDto);
  
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('accessToken', response.data.token);
        const expirationTime = (new Date().getTime() + 3600000).toString();
        localStorage.setItem("sessionExpiration", expirationTime);
      }
  
      return response.data;
    } catch (error) {
      console.log('Failed to login backend');
      return false;
    }
  }
  

export async function getUsers() {
    return  axios.get(`${BASE_URL}/Users`);
}
export const logout = () => {
    localStorage.removeItem("user");
  };