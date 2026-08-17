import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const api = axios.create({ baseURL: API_URL });

// Attach the access token to every request except register/login,
// which must work even if a stale/invalid token is sitting in
// localStorage from a previous session.
const PUBLIC_PATHS = ["/auth/register/", "/auth/login/"];

api.interceptors.request.use((config) => {
  const isPublic = PUBLIC_PATHS.some((p) => config.url?.startsWith(p));
  if (typeof window !== "undefined" && !isPublic) {
    const token = localStorage.getItem("access_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function registerUser(payload) {
  const res = await api.post("/auth/register/", payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await api.post("/auth/login/", payload);
  return res.data;
}

export async function getMe() {
  const res = await api.get("/auth/me/");
  return res.data;
}

export async function createRequirement(payload) {
  const res = await api.post("/requirements/", payload);
  return res.data;
}

export async function listRequirements(params) {
  const res = await api.get("/requirements/", { params });
  return res.data;
}

export async function getMatches(requirementId) {
  const res = await api.get(`/matching/requirement/${requirementId}/`);
  return res.data;
}

export async function getIndividualProfile() {
  const res = await api.get("/profiles/individual/");
  return res.data;
}

export async function updateIndividualProfile(payload) {
  const res = await api.patch("/profiles/individual/", payload);
  return res.data;
}

export async function getCompanyProfile() {
  const res = await api.get("/profiles/company/");
  return res.data;
}

export async function updateCompanyProfile(payload) {
  const res = await api.patch("/profiles/company/", payload);
  return res.data;
}

export default api;
