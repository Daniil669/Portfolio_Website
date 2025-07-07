import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE

const contact_api = async (data) => {
    try {
        const response = await axios.post(`${API_BASE}/api/contact/contact_message`, data)
        console.log(response)
    } catch (error) {
        console.log(error)
    }
}

export {contact_api}