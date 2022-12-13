import axios from "axios"


export const createClient = async (idClient: number) => {
    try {
        const tickets = await axios.request({
            baseURL: "http://localhost:4000",
            url: '/api/client',
            method: 'post',
            data: {
                idClient
            }
        })
        
        return tickets.data
    } catch (err) {
        return err
    }

}