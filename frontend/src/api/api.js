// src/api/api.js
import axios from "axios";

const API = "http://localhost:8080/api";

export const getMembers = () => axios.get(`${API}/members`);
export const addMember = (data) => axios.post(`${API}/members`, data);

export const getTrainers = () => axios.get(`${API}/trainers`);
export const getPlans = () => axios.get(`${API}/plans`);
