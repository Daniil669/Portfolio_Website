import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE

const contact_api = async (data) => {
    try {
        const response = await axios.post(`${API_BASE}/api/contact/contact_message`, data)
        const message = response.data.status ? response.data.status : response.data.error
        return message
    } catch (error) {
        console.log(error)
        return "Something went wrong while sending your message."
    }
}

export {contact_api}