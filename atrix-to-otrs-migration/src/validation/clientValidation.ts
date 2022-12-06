import { ClientOtrs } from "@/prisma/Otrs/ClientRepository"

export const clientValidation = (client: ClientOtrs): Boolean => {
    
    const validation = (client.customer_id === '') || (client.name === '') || (client.razao_social === '') 
    // console.log({client,validation})
    return validation
}