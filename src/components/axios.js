import axios from "axios";

const instance = axios.create({
    baseURL: "https://amazon-clone-backend-three.vercel.app",
});

export default instance;