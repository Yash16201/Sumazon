import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null


const products = async() => {
    try {
        const response = await axios.get(`${baseurl}product/all-products`, {withCredentials:true});
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}

const addproduct = async(product) => {
    try {
        const response = await axios.post(`${baseurl}product/addProduct`, product ,{
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

const editProduct = async(product) => {
    try {
        const response = await axios.put(`${baseurl}product/editproduct`, product ,{
            withCredentials:true,
            headers : {
                Authorization : `Bearer ${tokenFromLocalStorage.token}`,
                Accept : "application/json"
            }
        });
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error)
    }   
}

const deleteProduct = async(product) => {
    try {
        const response = await axios.post(`${baseurl}product/deleteproduct`, product ,{
            withCredentials:true,
            headers : {
                Authorization : `Bearer ${tokenFromLocalStorage.token}`,
                Accept : "application/json"
            }
        });
        console.log(response);
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
    addproduct,
    editProduct,
    deleteProduct,
    singleProductById
}

export default productServices;