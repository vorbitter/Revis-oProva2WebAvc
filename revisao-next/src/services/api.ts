import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:5247/api'
})

//Para toda a requisição com Axios sera enviado o token JWT
api.interceptors.request.use(config => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token')
        if (token && !config.url?.endsWith('/usuario/login')) {
            config.headers.Authorization = `Bearer ${token}`
        }
    }
    return config
})

// Alternativa, codigo do professor, use se for usar o fetch ao invés do axios
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//         config.headers.Authorization =
//             `Bearer ${token}`;
//     }
//     return config;
// });

api.interceptors.response.use(response => response, error => {
    if (typeof window !== 'undefined' && error.response?.status === 401) {
        window.location.href = '/usuario/login'
    }
    return Promise.reject(error)
})

export default api