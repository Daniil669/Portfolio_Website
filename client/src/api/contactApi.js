import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE

const contact_api = async (data) => {
    try {
        const response = await axios.post(`${API_BASE}/api/contact/contact_message`, data, {timeout: 8000})
        const message = response.data.status ? response.data.status : response.data.error
        return message
    } catch (error) {
      if (error.response) {
            if (error.response.status === 429) {
                return "Too many requests. Please try again later.";
            } else if (error.response.data?.error) {
                return error.response.data.error;
            }
        } else if (error.code === 'ECONNABORTED') {
            return "Request timed out. Please try again.";
        }
        return "Server error. Please try again later.";
    
    }
}

export {contact_api}