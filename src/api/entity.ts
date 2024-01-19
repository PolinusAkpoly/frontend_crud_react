import { webApiUrL } from "../enviromments/enviromment"
import { User } from "../models/User"
import { get, post, postWithFile, put } from "./api"



export const getDatas = async (entityName: string) => {
    const url = webApiUrL + entityName
    const datas = await get(url)
    return datas
  }

  export const getDatasById = async (entityName: string, _id: string) =>{
    const url = webApiUrL + entityName+"/" + _id
    const datas = await get(url)
    return datas
  }
  export const getDatasPerPage = async (entityName: string, page: number = 1, limit: number = 5) =>{
    const url = webApiUrL + entityName+"/by/page?pageNumber="+page+"&pageLimit="+limit
    const datas = await get(url)
    return datas
  }

  export const createData = async (entityName: string,  data: any) =>{
    entityName = entityName.toLowerCase()
    const url = webApiUrL + entityName
    const datas = await post(url,data)
    return datas
  }
  export const addDataWithFile = async (entityName: string, data: any, setProgress: any = null) =>{
    entityName = entityName.toLowerCase()
    const url = webApiUrL + entityName
    const datas = await postWithFile(url,data,{}, setProgress)
    return datas
  }
  
  export const updateData = async (entityName: string, id: string, data: any) =>{
    entityName = entityName.toLowerCase()
    const url = webApiUrL + entityName+"/"+id
    const datas = await put(url,data)
    return datas
  }
  export const createUser = async (user: User) => {
    const url = webApiUrL + "user/signup"
    const data = await post(url, user)
  
    return data
  
  }









