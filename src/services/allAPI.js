import { commonAPI } from "./commonAPI";
import { BASE_URL } from "./baseURL";

export const addPostAPi = async(reqBody,reqHeader)=>{
    return await commonAPI("post",`${BASE_URL}/user/upload`,reqBody,reqHeader)
}

export const MainProjectApi = async()=>{
    return await commonAPI("GET",`${BASE_URL}/user/project`,'','')
}