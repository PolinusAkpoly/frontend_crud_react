
export const apiUrl = () =>{
    if (process.env.NODE_ENV === "development") {
        return 'http://localhost:3000/'
    } else {
        return 'http://api.jstors.fr/'
    }
    
    }
    
    export const webApiUrL = apiUrl()
    
    