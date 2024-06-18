import requestInstance from "../utils/request";

export const getDTR = async (params: string) => {
  const res = await requestInstance.get(params);
  return res
};
export const postDTR = async(url:string, params:{})=> {
  const res = await requestInstance.post(url, params); 
  return res; 
}

export const deleteDTR = async(params)=>{
  const res = await requestInstance.delete(`/DTR/${params}`);
  return res; 
}