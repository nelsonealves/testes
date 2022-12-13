import { getContractsOfClient as getContractsOfClientAtrix, ContractRepository } from "@/prisma/Atrix/ContractRepository"
import { getContractsOfClientOtrs, ContractOtrsRepository, deleteAllContracts } from "@/prisma/Otrs/ContractRepository"
import { clientValidation as fieldsValidation } from "@/validation/clientValidation"

import { objIsEmpty, objMerge } from "@/util"
import { ticketMigration } from "./TicketAtrix"
import { createContract } from "@/endpoints/Axios/CreateContract"
import { runCacheClean } from "@/endpoints/Axios/RunCacheCleanOtrs"
import { contractDataByIdAtrix, deleteContractData } from "@/prisma/Corpintegrator/contractData"

export const contractMigration = async (clientIDAtrix: number | null, clientIDOtrs: string | null): Promise<Boolean> => {

    // console.log({clientIDAtrix, clientIDOtrs})

    const contractsOfClientAtrix: ContractRepository.Result = await getContractsOfClientAtrix(clientIDAtrix)

    // console.log({ contractsOfClientAtrix })

    console.log({contractsOfClientAtrix})
    if ((contractsOfClientAtrix.length > 0) && clientIDAtrix !== null && clientIDOtrs !== null ) { // Se não for vazio, existe contract
        await deleteAllContracts(clientIDOtrs)
        await contractsOfClientAtrix.map(async contract => {

            const contractData = await deleteContractData(contract.id) // Limpa contract data (se tiver)
            await runCacheClean(contract.login) /// Limpa cache do otrs
            // console.log({ contractData })
            
            const result = await createContract(contract.id)
            // console.log({ result: result })
            // await ticketMigration(contract.id)
        })
    }


}


const contractDataMerge = (clientAtrix: ClientAtrix, clientOtrs: ClientOtrs): ClientOtrs => {
    

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