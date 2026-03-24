import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/v1";

const client = axios.create({
	baseURL: API,
	headers: { "Content-Type": "application/json" },
});

client.interceptors.request.use((config) => {
	const token = localStorage.getItem("mn_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export const registerUser = (payload) => client.post("/auth/register", payload);
export const loginUser = (payload) => client.post("/auth/login", payload);
export const sendOtp = (email) => client.post("/auth/send-otp", { email });
export const verifyOtp = (payload) => client.post("/auth/verify-otp", payload);

export const getDashboard = () => client.get("/dashboard/me");
export const getAkhadaData = () => client.get("/akhada/content");
export const getSubscriptionPlans = () => client.get("/subscriptions/plans");
export const getSubscriptionStatus = () => client.get("/subscriptions/status");

export const createOrder = (payload) => client.post("/payments/order", payload);
export const verifyPayment = (payload) => client.post("/payments/verify", payload);

export default client;
