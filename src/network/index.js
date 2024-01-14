import axios from "axios"
import backendLink from "../constants/dummyApi"

export const getProductsApiCall = async(link)=>{
    const {data} = await axios.get(link);
    
    return data;
}

export const createProductApiCall = async(payload)=>{
    const config = {headers: { "Content-Type":"application/json"}}
    const {data} = await axios.post(`${backendLink}/products/add`,payload,config);
    
    return data;
}

export const updateProductApiCall = async(id,payload)=>{
    const config = {headers: { "Content-Type":"application/json"}}
    const {data} = await axios.put(`${backendLink}/products/${id}`,payload,config);
    
    return data;
}

export const deleteProductApiCall = async(id)=>{
    const config = {headers: { "Content-Type":"application/json"}}
    const {data} = await axios.delete(`${backendLink}/products/${id}`,config);
    
    return data;
}

export const getProductDetailsApiCall = async(id)=>{
    const {data} = await axios.get(`${backendLink}/products/${id}`);
    
    return data;
}

export const loginApiCall = async(username,password)=>{
    const config = {headers: { "Content-Type":"application/json"}}

        const {data}= await axios.post(`${backendLink}/auth/login`,
        {username,password}, 
        config
        );
    return data;
}

export const loadUserApiCall = async()=>{
    const config = {headers: { 'Authorization': localStorage.getItem("token")}}

    const {data}= await axios.get(`${backendLink}/user/me`,config);
   
    return data;
}
