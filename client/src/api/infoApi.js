import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE

const about_api = async (options = {}) => {
    try{
    const response = await axios.get(`${API_BASE}/api/info/about`, options);
    const result = response.data;
    return result
    }catch(error){
        console.log(error)
        return null
    }
}

const about_photo_api = async (options = {}) => {
    try {
    const response = await axios.get(`${API_BASE}/api/info/profile_photo`, {responseType:'blob', ...options})
    const result = URL.createObjectURL(response.data)
    return result
    } catch(error){
        console.log(error)
        return null
    }
}

const projects_api = async (options = {}) => {
    try{
    const response = await axios.get(`${API_BASE}/api/info/projects`, options)
    const result = response.data
    return result
    }catch(error){
        console.log(error)
        return null
    }
}

const freelance_project_api = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/freelance_project`)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const services_api = async (options = {}) => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/service`, options)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

const cv_api = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/cv`, {responseType: 'blob'})
        return response.data
    } catch (error) {
        console.log(error)
        return null
    }
}

export {about_api, projects_api, about_photo_api, freelance_project_api, services_api, cv_api}