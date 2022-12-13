import { getRangeOfClient, ClientRepository, Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { clientValidation as fieldsValidation } from "@/validation/clientValidation"
import { getClientOnOtrs, ClientOtrs } from "@/prisma/Otrs/ClientRepository"
import { objIsEmpty, objMerge } from "@/util"
import { contractMigration } from "@/migration/"
import { createClient } from "@/endpoints/Axios/CreateClient"
import { updateClient } from "@/endpoints/Axios/UpdateClient"
export const clientMigration = async (clientAtrix: ClientAtrix): Promise<Boolean> => {
    try {
        let clientExistsInOtrs: Boolean = false
        
        console.log(clientAtrix)
        const clientOtrs: ClientOtrs = await getClientOnOtrs(clientAtrix.document)
        console.log({ clientOtrs })
        if (clientAtrix.typeclient == 'J' && (clientAtrix.companyname == '' || clientAtrix.companyname == null)) return false

        if (!objIsEmpty(clientOtrs)) { // Se não for vazio, existe cliente no Otrs
            console.log(`${clientAtrix.firstName}- ${clientAtrix.document} EXISTE NO OTRS`)
            clientExistsInOtrs = true
            
        }
       

        const clientOk = fieldsValidation(clientAtrix) // valida dados do cliente
        console.log({id: clientAtrix.id, clientOk})
        if (!clientOk) return false

        

        if (clientExistsInOtrs) {
            updateClient({
                customer_id: clientAtrix.document,
                city: clientAtrix.city,
                CNPJ: clientAtrix.document,
                comments: '-',
                country: clientAtrix.country,
                district: clientAtrix.state,
                name: `${clientAtrix.firstName} ${clientAtrix.lastName}`,
                razao_social: clientAtrix.companyname,
                street: clientAtrix.address1,
                UF: clientAtrix.state,
                zip: clientAtrix.postcode
            })
            
        } else {
            await createClient(clientAtrix.id)
        }
        
        // await contractMigration(clientAtrix.id, clientOtrs.customer_id)
        


        return clientOk //if false - allow to migrate ok | true -> disallow to migrate
        // return true
    } catch (err) {
        console.log({ clientErr: err })
        return false
    }


}


const clientDataMerge = (clientAtrix: ClientAtrix, clientOtrs: ClientOtrs): ClientOtrs => {
    return {
        customer_id: !clientOtrs.customer_id ? clientAtrix.document! : clientOtrs?.customer_id!,
        name: !clientOtrs.name ? `${clientAtrix.firstName} ${clientAtrix.lastName}` : clientOtrs.name!, //client.companyname!,
        CNPJ: !clientOtrs.CNPJ ? clientAtrix.document! : clientOtrs.CNPJ!,
        street: !clientOtrs.street ? clientAtrix.address1 : clientOtrs.street,
        district: !clientOtrs.district ? clientAtrix.state : clientOtrs.district,
        UF: !clientOtrs.UF ? clientAtrix.state : clientOtrs.UF,
        zip: !clientOtrs.zip ? clientAtrix.postcode : clientOtrs.zip,
        country: !clientOtrs.country ? clientAtrix.country! : clientOtrs.country,
        city: !clientOtrs.city ? clientAtrix.city : clientOtrs.city,
        comments: clientOtrs.comments || '-',
        razao_social: !clientOtrs.razao_social ? clientAtrix.companyname! : clientOtrs.razao_social!
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