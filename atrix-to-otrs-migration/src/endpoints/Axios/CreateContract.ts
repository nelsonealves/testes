import axios from "axios"


export const createContract = async (idContract: number) => {
    try {
        const tickets = await axios.request({
            baseURL: "http://localhost:4000",
            url: '/api/contract',
            method: 'post',
            data: {
                idContract
            }
        })
        
        return tickets.data
    } catch (err) {
        return err
    }

}