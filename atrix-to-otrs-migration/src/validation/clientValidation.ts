import { Client } from "@/prisma/Atrix/ClientRepository"

export const clientValidation = (client: Client): Boolean => {
    
    const validation = (client.document === '') || (client.document === null) // || (client.razao_social === '') 
    // console.log({client,validation})
    return !validation
}