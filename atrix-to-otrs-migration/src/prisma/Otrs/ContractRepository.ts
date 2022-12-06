
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { PrismaClient } from "@internal/.prisma/Otrs/client"

const prismaClient = new PrismaClient()

export const getContractsOfClientOtrs = async (customer_id: string): Promise<ContractOtrsRepository.Result> => {
    try {
        const contractOtrs = await prismaClient.customer_user.findMany({
            where: {
                customer_id: customer_id
            }
        });

        if (!contractOtrs) return [] as ContractOtrsRepository.Result
        
        return contractOtrs.map(contract => {
            return {
                id: contract.id,
                login: contract.login,
                customer_id: contract.customer_id
            }
        })

    } catch (err) {
        return err as ContractOtrsRepository.Result
    }



}

export const deleteAllContracts = async (customer_id: string): Promise<any> => {
    try {
        const contractOtrs = await prismaClient.customer_user.deleteMany({
            where: {
                customer_id: customer_id
            }
        });

        if (!contractOtrs) return [] as ContractOtrsRepository.Result
        
        return contractOtrs

    } catch (err) {
        console.log({deleteAllContractsErr: err})
        return err as ContractOtrsRepository.Result
    }



}

export type ContractOtrs = {
    id: number
    login: string
    customer_id: string
}
export namespace ContractOtrsRepository {
    export type Result = ContractOtrs[]
}