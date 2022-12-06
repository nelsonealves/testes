
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { PrismaClient } from "@internal/.prisma/Otrs/client"

const prismaClient = new PrismaClient()

export const getClientOnOtrs = async (document: string): Promise<ClientOtrsRepository.Result> => {
    try {
        const clientOtrs = await prismaClient.customer_company.findFirst({
            where: {
                CNPJ: document
            }
        });

        if (!clientOtrs) return {} as ClientOtrsRepository.Result
        
        return {
            customer_id: clientOtrs?.customer_id!,
            name: clientOtrs?.name!,
            CNPJ: clientOtrs?.CNPJ!,
            street: clientOtrs?.street!,
            district: clientOtrs?.district!,
            UF: clientOtrs?.UF!,
            zip: clientOtrs?.zip!,
            city: clientOtrs?.city!,
            country: clientOtrs?.country!,
            comments: clientOtrs?.comments!,
            razao_social: clientOtrs?.razao_social

        }
    } catch (err) {
        console.log(err)
        return {} as ClientOtrsRepository.Result
    }

    
    
}

export type ClientOtrs = {
    customer_id: string
    name: string
    CNPJ: string
    street: string
    district: string
    UF: string
    zip: string
    city: string
    country: string
    razao_social: string
    comments: string
}
export namespace ClientOtrsRepository {
    export type Result = ClientOtrs
}