

export const get = async (url: string, options: any = {}) => {
    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            return {
                isSuccess: false
            }
        }

        return await response.json()
    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }

}


export const post = async (url: string, data: any, options: any = {}) => {
    try {
        options.method = "POST"
        options.body = JSON.stringify(data)
        options.headers = {
            ...options.headers,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
        
        const response = await fetch(url, options)

        if (!response.ok) {
            const error = await response.json()
            return {
                ...error,
                isSuccess: false
            }
        }

        return await response.json()

    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }

}

export const postWithFile = async (url: string, formData: FormData, options: any = {}, setProgress: any = {}) => {
    try {
        options.method = "POST"
        options.body = formData
        console.log(setProgress);
        
       
        options.headers = {
            ...options.headers,
        }
        
        const response = await fetch(url, options)

        if (!response.ok) {
            const error = await response.json()
            return {
                ...error,
                isSuccess: false
            }
        }

        return await response.json()

    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }

}
export const putWithFile = async (url: string, formData: FormData, options: any = {}, setProgress: any = {}) => {
    try {
        options.method = "PUT"
        options.body = formData
        console.log(setProgress);
        
       
        options.headers = {
            ...options.headers,
        }
        
        const response = await fetch(url, options)

        if (!response.ok) {
            const error = await response.json()
            return {
                ...error,
                isSuccess: false
            }
        }

        return await response.json()

    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }

}

export const put = async (url: string, data: any, options: any = {}) => {
    try {
        options.method = "PUT"
        options.body = JSON.stringify(data)
        options.headers = {
            ...options.headers,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        const response = await fetch(url, options)
        if (!response.ok) {

            const error = await response.json()
            return {
                ...error,
                isSuccess: false,
            }
        }

        return await response.json()
    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }
}
export const remove = async (url: string, options: any = {}) => {
    try {
        options.method = "DELETE"
        options.headers = {
            ...options.headers,
            "Accept": "application/json",
            "Content-Type": "application/json",
        }

        const response = await fetch(url, options)
        if (!response.ok) {

            const error = await response.json()
            return {
                ...error,
                isSuccess: false,
            }
        }

        return await response.json()
    } catch (error) {
        return {
            isSuccess: false,
            error
        }
    }
}













