import { getTickets as getTicketsAtrix } from "@/prisma/Atrix/TicketRepository"
import { getContractsOfClientOtrs } from "@/prisma/Otrs/ContractRepository"
import { clientValidation as fieldsValidation } from "@/validation/clientValidation"
import { getTicketsOtrs } from "@/prisma/Otrs/TicketRepository"
import { objIsEmpty, objMerge } from "@/util"
import {createTicketByContract} from "@/endpoints/Axios/CreateTicket"
export const ticketMigration = async (contractIDAtrix: number): Promise<Boolean> => {


    // const contractsOfClientAtrix = await getTicketsAtrix(clientIDAtrix)
    // const ticketsOtrs = await getTicketsOtrs(customerIDOtrs)
    // console.log({contractsOfClient})
    // console.log({contractIDAtrix})
    const ticketsAtrix = await createTicketByContract(contractIDAtrix)
    console.log({ticketsAtrix})
    // if (!(contractsOfClientAtrix.length > 0)) { // Se não for vazio, existe cliente no Otrs
    //     // console.log({'NoOtrs': 'sim', atrix: clientAtrix, otrs: clientOtrs})
    //     // console.log(`${clientID} com contrato`)
    //     // console.log({contractsOfClient})
    //     // clientMigration = objMerge(clientMigration, clientDataMerge(clientAtrix, clientOtrs))
    // }

    // const clientOk = fieldsValidation(clientMigration) // valida dados do cliente

    // if (clientOk) {
    //     // It allow to migrate


    //     return true
    // } else {
    //     // It desallow to migrate

    //     return false
    // }



}


const contractDataMerge = (clientAtrix: ClientAtrix, clientOtrs: ClientOtrs): ClientOtrs => {
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
        district: clientAtrix?.state === '' ? clientOtrs?.district : clientAtrix?.state,
        zip: clientAtrix?.postcode === '' ? clientOtrs?.zip : clientAtrix?.postcode,
        country: clientAtrix?.country === '' ? clientOtrs?.country : clientAtrix?.country,
        city: clientAtrix?.city === '' ? clientOtrs?.city : clientAtrix?.city,
        comments: clientOtrs?.comments,
        UF: clientAtrix?.state! === '' ? clientOtrs.UF : clientAtrix?.state!,
    }
}