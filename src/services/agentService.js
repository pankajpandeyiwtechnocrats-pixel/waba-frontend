import api from "./api";

export const getAgents = async () => {
  const res = await api.get("/agents");
  return res.data;
};

export const createAgent = async (data) => {
  const res = await api.post("/agents", data);
  return res.data;
};
