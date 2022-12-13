import { PrismaClient } from "@internal/.prisma/CorpIntegrator/client"

const prismaClient = new PrismaClient()

export const getLastId = async (): Promise<number> => {
    try {
        const contractData = await prismaClient.lastid_table_jobs.findFirst({
            where: {
                name: 'client_migration'

            },

        })

        await prismaClient.$disconnect()
        return contractData?.value!
    } catch (err) {
        return err as number
    }
}

export const setLastId = async (value: number): Promise<number> => {
    try {
        const contractData = await prismaClient.lastid_table_jobs.update({
            where: {
                id: 1

            },
            data: {
                value: value
            }

        })

        await prismaClient.$disconnect()
        return contractData?.value!
    } catch (err) {
        return err as number
    }
}