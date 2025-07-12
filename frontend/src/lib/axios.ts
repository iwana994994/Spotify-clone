import axios from "axios";

export const axiosInstance = axios.create({
 baseURL: "HTTP://localhost:5000"
});