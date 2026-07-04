import axios from "axios";

const api = axios.create({
    baseURL: "https://expense-tracker-1-backend-j1mg.onrender.com"
});

export default api;