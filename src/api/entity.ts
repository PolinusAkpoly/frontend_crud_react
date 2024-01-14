import { webApiUrL } from "../enviromments/enviromment"
import { get, put } from "./api"



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

  export const updateData = async (entityName: string, id: string, data: any) =>{
    entityName = entityName.toLowerCase()
    const url = webApiUrL + entityName+"/"+id
    const datas = await put(url,data)
    return datas
  }









