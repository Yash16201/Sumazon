import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null

const orders = async() => {
    try {
        const response = await axios.get(`${baseurl}order/getallorders`, {
            withCredentials:true,
            headers : {
                Authorization : `Bearer ${tokenFromLocalStorage.token}`,
                Accept : "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}

const orderServices = {
    orders,
}

export default orderServices;