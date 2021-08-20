import instance from "../Config/axios"
export function getAll(){
    return instance.get("items")
}
export function getById(id){
    return instance.get("items/"+id)
}