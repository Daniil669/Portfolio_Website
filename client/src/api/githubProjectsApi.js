import axios from "axios";

// const API_BASE = import.meta.env.VITE_API_BASE

const demos_api = async (project_name) => {
    try {
        const response = await axios.get(`/api/github/demo/${project_name}`, {responseType: 'blob'})
        const result = URL.createObjectURL(response.data)
        return result
    } catch (error) {
        return error
    }
}

const projects_info_api = async (gith_type) => {
    try {
        const response = await axios.get(`/api/github/projects_info/${gith_type}`)
        const result = response.data
        return result
    } catch (error) {
        if (error.response && error.response.status === 429) {
            return { error: "GitHub project data rate limit exceeded. Please wait and try again." };
        }
        return { error: "Failed to load project info." };
    }
}

export {demos_api, projects_info_api}