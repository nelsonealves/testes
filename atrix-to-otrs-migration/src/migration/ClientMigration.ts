import { getRangeOfClient, ClientRepository, Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { clientValidation as fieldsValidation } from "@/validation/clientValidation"
import { getClientOnOtrs, ClientOtrs } from "@/prisma/Otrs/ClientRepository"
import { objIsEmpty, objMerge } from "@/util"
import { contractMigration } from "@/migration/"
import { createClient } from "@/endpoints/Axios/CreateClient"
import { updateClient } from "@/endpoints/Axios/UpdateClient"
export const clientMigration = async (clientAtrix: ClientAtrix): Promise<Boolean> => {
    try {
        let clientExistsOnOtrs: Boolean = false
        let clientMigration: ClientOtrs = {} as ClientOtrs
    
        const clientOtrs: ClientOtrs = await getClientOnOtrs(clientAtrix.document)
        console.log({clientOtrs})
        if (!objIsEmpty(clientOtrs)) { // Se não for vazio, existe cliente no Otrs
            console.log(`${clientOtrs.customer_id}- ${clientAtrix.document} EXISTE NO OTRS`)
            clientExistsOnOtrs = true
            clientMigration = objMerge(clientMigration, clientDataMerge(clientAtrix, clientOtrs))
            const clientOk = fieldsValidation(clientMigration)
    
        } else {
            console.log(`${clientAtrix.firstName}- ${clientAtrix.document} NÃO EXISTE NO OTRS`)
            await createClient(clientAtrix.id)
            return false
        }
    
        const clientOk = fieldsValidation(clientMigration) // valida dados do cliente
       
        if (!clientOk) {
            updateClient({
                customer_id: clientMigration.customer_id,
                city: clientMigration.city,
                CNPJ: clientMigration.CNPJ,
                comments: clientMigration.comments,
                country: clientMigration.country,
                district: clientMigration.district,
                name: clientMigration.name,
                razao_social: clientMigration.razao_social,
                street: clientMigration.street,
                UF: clientMigration.UF,
                zip: clientMigration.zip
            })
            await contractMigration(clientAtrix.id, clientOtrs.customer_id)
    
        }
    
        // return clientOk //if false - allow to migrate ok | true -> disallow to migrate
        return false
    } catch(err) {
        console.log({clientErr: err})
        return false
    }
   

}


const clientDataMerge = (clientAtrix: ClientAtrix, clientOtrs: ClientOtrs): ClientOtrs => {
    return {
        customer_id: clientOtrs?.customer_id! || clientAtrix.document!,
        name: clientOtrs.name! || clientAtrix.companyname! || clientAtrix.lastName!, //client.companyname!,
        CNPJ: clientOtrs.CNPJ! || clientAtrix.document!,
        street: clientOtrs.street! || clientAtrix.address1,
        district: clientOtrs.district! || clientAtrix.state,
        UF: clientOtrs.UF! || clientAtrix.state,
        zip: clientOtrs.zip! || clientAtrix.postcode,
        country: clientOtrs.country || clientAtrix.country!,
        city: clientOtrs.city || clientAtrix.city,
        comments: clientOtrs.comments || '-',
        razao_social: clientOtrs.razao_social || clientAtrix.firstName!! 
        // ...clientOtrs,
        // name: clientAtrix?.firstName! === '' ? clientOtrs.name : `${clientAtrix?.firstName!} ${clientAtrix?.lastName!}`,
        // CNPJ: clientAtrix?.document === '' ? clientOtrs?.CNPJ : clientAtrix?.document,
        // street: clientAtrix?.address1 === '' ? clientOtrs?.street : clientAtrix?.address1,
        // district: clientAtrix?.state === '' ? clientOtrs?.district : clientAtrix?.state,
        // zip: clientAtrix?.postcode === '' ? clientOtrs?.zip : clientAtrix?.postcode,
        // country: clientAtrix?.country === '' ? clientOtrs?.country : clientAtrix?.country,
        // city: clientAtrix?.city === '' ? clientOtrs?.city : clientAtrix?.city,
        // comments: clientOtrs?.comments,
        // UF: clientAtrix?.state! === '' ? clientOtrs.UF : clientAtrix?.state!,
    }
}