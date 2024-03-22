
import axios from "axios";
import {BASE_URL} from "../../Constants/Index";
import {notification} from "antd";
import {userDto} from "../../Interfaces/UserDto";

export async function getUsers() {
    return  axios.get(`${BASE_URL}/Users`);
}
export async function registerUser(userId:string){
    return axios.put('${BASE_URL}/${userId}')
        .then((response) => {
            if (response.status === 200) {
                notification.success({
                    message: 'Success',
                    description: 'Data sent successfully',
                });
            } else {
                notification.error({
                    message: 'Error',
                    description: 'Failed to update data to the backend',
                });
            }
        })
        .catch((error) => {
            notification.error({
                message: 'Error',
                description: 'Failed to update data to the backend',
            });
        });
}