import requestInstance from "../utils/request";

export const getDTR = async (params: string) => {
  const res = await requestInstance.get(params);
  return res
};
