
import { Client as ClientAtrix } from "@/prisma/Atrix/ClientRepository"
import { PrismaClient } from "@internal/.prisma/Otrs/client"

const prismaClient = new PrismaClient()


export const getTicketsOtrs = async (customer_user_id: string): Promise<TicketOtrsRepository.Result> => {
    try {
        const contractOtrs = await prismaClient.ticket.findMany({
            where: {
                customer_user_id: customer_user_id
            }
        });

        if (!contractOtrs) return [] as TicketOtrsRepository.Result

        return contractOtrs.map(contract => {
            return {
                id: contract.id,
                login: contract.login,
                customer_id: contract.customer_id
            }
        })

    } catch (err) {
        return {} as TicketOtrsRepository.Result
    }



}

export const updateTicketCustomerIdReference = async (idTicket: number, cnpj: string): Promise<TicketOtrsRepository.Result> => {
    try {
        const tickets = await prismaClient.ticket.update({
            where: {
                id: idTicket
            },
            data: {
                customer_id_reference: cnpj
            }
        });
        await prismaClient.$disconnect()
        if (!tickets) return [] as TicketOtrsRepository.Result
        
        return tickets

    } catch (err) {
        console.log(err)
        return {} as TicketOtrsRepository.Result
    }



}

export const getRangeOfTicketOtrs = async (idTicket: number, range: number): Promise<TicketOtrsRepository.Result> => {
    try {
        console.log({idTicket, range})
        const tickets = await prismaClient.ticket.findMany({
            where: {
                id: {
                    gt: idTicket
                }
                
               
            },
            orderBy: {
                id: 'asc'
            },
            take: range,
            include: {
                customer_user: {
                    include: {
                        customer_company: true
                    }
                }
            }
        });
        // console.log({tickets})
        if (!tickets) return [] as TicketOtrsRepository.Result

        return tickets

    } catch (err) {
        console.log(err)
        return {} as TicketOtrsRepository.Result
    }



}

export const updateCustomerIdReference = async (ticket: Pick<TicketOtrs, "customer_id" | "customer_user_id">) => {
    const tickets = await prismaClient.ticket.update({
        where: {
            customer_id: ticket.customer_id
          
        },
        data: {
            customer_id_migration_reference: ticket.customer_id,
            customer_user_id_migration_reference: ticket.customer_user_id
        }
      })
        
      
      await prismaClient.$disconnect()
      return tickets
  }

export type TicketOtrs = {
    id: number
    login: string
    customer_id: string
    customer_user_id: string
    customer_id_migration_reference: string
    customer_user_id_migration_reference: string
}
export namespace TicketOtrsRepository {
    export type Result = TicketOtrs[]
}