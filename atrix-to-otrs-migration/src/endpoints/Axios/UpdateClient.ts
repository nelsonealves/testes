import axios from "axios"


export const updateClient = async ({ customer_id,
    name,
    CNPJ,
    street,
    district,
    UF,
    zip,
    country,
    city,
    comments,
    razao_social }: UpdateClientController.Request) => {
    try {
        const clientUpdate = await axios.request({
            baseURL: "http://localhost:4000",
            url: '/api/client',
            method: 'put',
            data: {
                customer_id,
                name,
                CNPJ,
                street,
                district,
                UF,
                zip,
                country,
                city,
                comments,
                razao_social
            }
        })

        return clientUpdate.data
    } catch (err) {
        return err
    }

}

export namespace UpdateClientController {
    export type Request = {
        customer_id: string
        name: string
        CNPJ: string
        street: string
        district: string
        UF: string
        zip: string
        country: string
        city: string
        comments: string
        razao_social: string
    }
}