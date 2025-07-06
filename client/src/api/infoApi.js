import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE

const about = () => {
    axios.get(`${API_BASE}/api/info/about`).
    then((reponse)=>{
        const result = reponse.data
        return result
    }).catch((error)=>{
        console.log(error)
    })
}



export {about}