import axios from "axios"


export const createTicketByContract = async (idContract: number) => {
    try {
        const tickets = await axios.request({
            baseURL: "http://localhost:4000",
            url: '/api/ticket',
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