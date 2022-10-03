import { getRangeOfClient, ClientRepository, Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { clientValidation as fieldsValidation } from "@/validation/clientValidation"
import { getClientOnOtrs, ClientOtrs } from "@/prisma/Otrs/ClientRepository"
import { objIsEmpty, objMerge } from "@/util"

export const clientMigration = async (clientAtrix: ClientAtrix): Promise<Boolean> => {

    let clientExistsOnOtrs: Boolean = false
    let clientMigration: ClientAtrix = Object.assign(clientAtrix, {})

    const clientOtrs = await getClientOnOtrs(clientAtrix.document)

    if (!objIsEmpty(clientOtrs)) { // Se não for vazio, existe cliente no Otrs
       
        clientExistsOnOtrs = true
        clientMigration = objMerge(clientMigration, clientDataMerge(clientAtrix, clientOtrs))
    }

    const clientOk = fieldsValidation(clientMigration) // valida dados do cliente

    if (clientOk) {
        // It allow to migrate
        

        return true
    } else {
        // It desallow to migrate
        
        return false
    }


   
}


const clientDataMerge = (clientAtrix: ClientAtrix, clientOtrs: ClientOtrs): ClientOtrs => {
    // return {
    //     ...clientOtrs,
    //     name: clientOtrs.name === '' ? `${clientAtrix?.firstName!} ${clientAtrix?.lastName!}` : clientOtrs.name,
    //     CNPJ: clientOtrs?.CNPJ === '' ? clientAtrix?.document : clientOtrs?.CNPJ,
    //     street: clientOtrs?.street === '' ? clientAtrix?.address1 : clientOtrs?.street,
    //     district: clientOtrs?.district === '' ? clientAtrix?.state : clientOtrs?.district,
    //     zip: clientOtrs?.zip === '' ? clientAtrix?.postcode : clientOtrs?.zip,
    //     country: clientOtrs?.country === '' ? clientAtrix?.country : clientOtrs?.country,
    //     city: clientOtrs?.city === '' ? clientAtrix?.city : clientOtrs?.city,
    //     comments: clientOtrs?.comments === '' ? '-' : clientOtrs?.comments,
    //     UF: clientOtrs.UF === '' ? clientAtrix?.state! : clientOtrs.UF,
    // }

    return {
        ...clientOtrs,
        name: clientAtrix?.firstName! === '' ? clientOtrs.name : `${clientAtrix?.firstName!} ${clientAtrix?.lastName!}`,
        CNPJ: clientAtrix?.document === '' ? clientOtrs?.CNPJ : clientAtrix?.document,
        street: clientAtrix?.address1 === '' ? clientOtrs?.street : clientAtrix?.address1,
        district: clientAtrix?.state  === '' ? clientOtrs?.district : clientAtrix?.state,
        zip: clientAtrix?.postcode === '' ? clientOtrs?.zip : clientAtrix?.postcode,
        country: clientAtrix?.country === '' ? clientOtrs?.country : clientAtrix?.country,
        city: clientAtrix?.city === '' ? clientOtrs?.city : clientAtrix?.city,
        comments: clientOtrs?.comments,
        UF: clientAtrix?.state! === '' ? clientOtrs.UF : clientAtrix?.state!,
    }
}