export const userlocalStorageData  = () =>{
    const localData = localStorage.getItem("userId")
    const userId = JSON.parse(localData)
    return userId
}