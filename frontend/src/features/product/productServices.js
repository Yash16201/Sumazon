import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

const products = async() => {
    try {
        const response = await axios.get(`${baseurl}product/all-products`, {withCredentials:true});
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}

const singleProductById = async(id) => {
    try {
        const response = await axios.post(`${baseurl}product/productbyid`, id, {withCredentials:true});
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}


const productServices = {
    products,
    singleProductById
}

export default productServices;