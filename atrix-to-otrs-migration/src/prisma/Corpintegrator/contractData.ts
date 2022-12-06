import { PrismaClient } from "@internal/.prisma/CorpIntegrator/client"

const prismaClient = new PrismaClient()

export const contractDataByIdOtrs = async (idOtrs: number): Promise<ContractDataRepository.Result> => {
    try {
        const contractData = await prismaClient.contract_data.findFirst({
            where: {
                id_otrs: idOtrs

            },

        })

        if (!contractData) return {} as ContractDataRepository.Result

        return contractData
    } catch (err) {
        return err as ContractDataRepository.Result
    }
}

export const contractDataByIdAtrix = async (idAtrix: number): Promise<ContractDataRepository.Result> => {
    try {
        const contractData = await prismaClient.contract_data.findFirst({
            where: {
                id_atrix: idAtrix

            },

        })

        if (!contractData) return {} as ContractDataRepository.Result

        return contractData
    } catch (err) {
        return err as ContractDataRepository.Result
    }
}

export const deleteContractData = async (idAtrix: number): Promise<any> => {
    try {
        const contractData = await prismaClient.contract_data.deleteMany({
            where: {
                id_atrix: idAtrix

            },

        })

        if (!contractData) return [] as ContractDataRepository.Result

        return contractData
    } catch (err) {
        return err as ContractDataRepository.Result
    }
}


export namespace ContractDataRepository {
    export type Result = {
        id_atrix?: number,
        id_otrs?: number
    }
}