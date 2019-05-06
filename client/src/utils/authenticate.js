import axios from 'axios'

export function setAuthenticationHeader(token) {
    if(token) {
        axios.defsults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}