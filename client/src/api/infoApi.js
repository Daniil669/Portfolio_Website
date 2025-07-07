import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE

const about_api = async () => {
    try{
    const response = await axios.get(`${API_BASE}/api/info/about`)
    const result = response.data
    return result
    }catch(error){
        console.log(error)
    }
}

const about_photo_api = async () => {
    try {
    const response = await axios.get(`${API_BASE}/api/info/profile_photo`, {responseType:'blob'})
    const result = URL.createObjectURL(response.data)
    return result
    } catch(error){
        console.log(error)
    }
}

const projects_api = async () => {
    try{
    const response = await axios.get(`${API_BASE}/api/info/projects`)
    const result = response.data
    return result
    }catch(error){
        console.log(error)
    }
}

const freelance_project_api = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/freelance_project`)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
    }
}

const services_api = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/service`)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
    }
}

const cv_api = async () => {
    try {
        const response = await axios.get(`${API_BASE}/api/info/cv`, {responseType: 'blob'})
        const result = URL.createObjectURL(response.data)
        return result
    } catch (error) {
        console.log(error)
    }
}

export {about_api, projects_api, about_photo_api, freelance_project_api, services_api, cv_api}