import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null

const makeOrder = async(orderData) =>{
    try {
        const response = await axios.post(`${baseurl}order/makeorder`, orderData, { 
            withCredentials:true,
            headers : {
                Authorization : `Bearer ${tokenFromLocalStorage.token}`,
                Accept : "application/json"
            },});
        return response.data;
    } catch (error) {
        console.error(error)
    }
}

const orderServices = {
    makeOrder
}

export default orderServices;