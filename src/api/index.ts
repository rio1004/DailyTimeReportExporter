import requestInstance from "../utils/request";

export const getDTR = async (params:number) => {
  const res = await requestInstance.get(`/DTR/${params}`);
  return res;
};
export const postDTR = async (url: string, params: {}) => {
  const res = await requestInstance.post(url, params);
  return res;
};
export const deleteDTR = async (params: number) => {
  const res = await requestInstance.delete(`/DTR/${params}`);
  return res;
};
export const login = async (params: {}) => {
  const res = await requestInstance.post("/user/login", params);
  return res;
};
