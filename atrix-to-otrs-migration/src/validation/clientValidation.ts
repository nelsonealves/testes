import { ClientRepository, Client } from "@/prisma/Atrix/ClientRepository"

export const clientValidation = (client: Client): Boolean => {
    
    const validation = !(client.document === '') || !(client.firstName === '') || !(client.email === '')

    return validation
}