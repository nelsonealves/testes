import axios from "axios"


export const runCacheClean = async (UserLogin: string) => {
    try {
        const tickets = await axios.request({
            baseURL: "http://186.225.32.183",
            url: `/cgi-bin/index.cgi?userlogin=${UserLogin}`,
            method: 'get',
            
        })
        
        return tickets.data
    } catch (err) {
        return err
    }

}