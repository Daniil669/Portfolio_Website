import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE

const demos_api = async (project_name) => {
    try {
        const response = await axios.get(`${API_BASE}/api/github/demo/${project_name}`, {responseType: 'blob'})
        const result = URL.createObjectURL(response.data)
        return result
    } catch (error) {
        console.log(error)
    }
}

const projects_info_api = async (gith_type) => {
    try {
        const response = await axios.get(`${API_BASE}/api/github/projects_info/${gith_type}?refresh=true`)
        const result = response.data
        return result
    } catch (error) {
        console.log(error)
    }
}

export {demos_api, projects_info_api}