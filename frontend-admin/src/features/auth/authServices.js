import axios from 'axios';
import { baseurl } from '../../utils/baseUrl';

const tokenFromLocalStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")): null


const login = async(user) => {
    try {
        const response = await axios.post(`${baseurl}user/login`, user, {withCredentials:true});
        if(response.data){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}

const allusers = async() => {
    try {
        const response = await axios.get(`${baseurl}user/all-users`, {
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


const updateProfile = async(user) => {
    try {
        const response = await axios.put(`${baseurl}user/${user.id}`, user ,{
            withCredentials:true,
            headers : {
                Authorization : `Bearer ${tokenFromLocalStorage.token}`,
                Accept : "application/json"
            },
        });
        if(response.data){
            localStorage.setItem("user", JSON.stringify(response.data))
        }
        return response.data;
    } catch (error) {
        console.error(error)
    }
    
}

const logout = async() => {
    localStorage.clear();   
}

const authServices = {
    login,
    allusers,
    logout,
    updateProfile
}

export default authServices;